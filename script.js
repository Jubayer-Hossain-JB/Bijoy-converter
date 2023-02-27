String.prototype.replaceAt = function(index, what) {
    return this.substring(0, index)+ what + this.substring(index +1,  this.length);
}
String.prototype.middleAdd = function(index, what){
    return this.substring(0, index)+ what + this.substring(index, this.length);
}
String.prototype.replaceAll = function(str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 

fetch('./key.json').then(r => r.json()).then(r => {
    asyncCall(r);
} );
var timer = '';
function asyncCall(d) {

    /***Data Structure Meaning ***
       d = data
       d[0] = unicode, d[1] = Classic
       [][0]= Code to Word, [][1] = fixing word
    */

    const areaUnicode =$('[name="Unicode"]');
    const areaClassic = $('[name="Classic"]');
    areaClassic.focus()
    let temp = "";
    let temp2 = 0 ;
    let temp3 = "";
    var length = 0;
    areaUnicode.on(
        'keydown', e =>{
            let code = e.keyCode;
            let shft = e.shiftKey;
            let ctrl = e.ctrlKey;
            let altr = e.altKey;
            let xchange = transform(code, false, d[0][0])
            if (xchange){
                if(ctrl || altr){
                    console.warn("Externel...")
                }
                else{
                    e.preventDefault()
                    let value = areaUnicode.val();
                    
                    let areaUnicodejs =  document.getElementsByName('Unicode')[0];
                    let currentPos = areaUnicodejs.selectionEnd;
                    
                    if(areaUnicodejs.selectionStart != currentPos){
                        var start = areaUnicodejs.selectionStart;
                        length -=currentPos-start;
                        value = value.substring(0, start) + value.substring(currentPos, value.length);
                        currentPos = start;
                    }
                    
                    var lastval;
                    if(currentPos>0){
                        lastval = value[currentPos-1];
                    }else{
                        lastval = "";
                    }
                    
                    let print = (shft ? xchange[2] : xchange[1]) + temp;//figuring out the keys value

                    if(temp){
                        value=value.replaceAt(currentPos-1,"");
                        currentPos-=1;
                        length-=1;
                    }

                    if (lastval != "্"){
                        switch (print){
                            case "ে":
                            case "ৈ":
                            case "ি":
                                temp = print;
                                // currentPos-=1;
                                break;
                            case "র্": 
                                if(lastval == "ে"|| lastval == "ৈ"|| lastval =="ি"){
                                    value = value.middleAdd(currentPos-2, print);
                                }else{
                                    value = value.middleAdd(currentPos-1, print);
                                }
                                print="";
                                break;
                            case "্র": 
                            case "্য":
                            case "্":
                                if(lastval == "ে"|| lastval == "ৈ"|| lastval =="ি"){
                                    temp3 = lastval
                                    temp2 = value.length+1;
                                    value = value.replaceAt(currentPos-1, "")
                                    // currentPos -=1
                                }
                                break;
                            default:
                                temp ="";
                            }
                        }
                        

                        value = value.middleAdd(currentPos, print)

                        // currentPos += 1+tempPos

                        if(temp2){
                        if(value.length === temp2){
                            console.log(currentPos)
                            value=value.middleAdd(currentPos+1, temp3) //There can be Error. Because, he can put his last step anywhere.
                            // currentPos += 1
                            //value += temp3;
                            temp2 = 0;
                            temp = "";
                        }
                    }
                    
                    areaUnicode.val(joint(value, d[0][1]));
                    if(print){
                        curlength = areaUnicode.val().length
                        currentPos+=curlength-length;
                        length = curlength
                        areaUnicodejs.selectionEnd = currentPos
                                        
                    }
                    
                }
            
                clearTimeout(timer)  ;          
                timer = setTimeout(translatetoClassic, 1000)

            }else if(code==8){
                length-=1;
                clearTimeout(timer)  ;          
                timer = setTimeout(translatetoClassic, 1000)
            }
        }
        
    );
    areaClassic.on(
        'keydown', e =>{
            let code = e.keyCode;
            let shft = e.shiftKey;
            let ctrl = e.ctrlKey;
            let altr = e.altKey;
            let xchange = transform(code, false, d[1][0])
            let value = "";

            if (xchange){
            if(ctrl || altr){
                temp =""
            }
            else{
                e.preventDefault()

                value = areaClassic.val()
                var areaClassicjs = document.getElementsByName("Classic")[0]

                let currentPos = areaClassicjs.selectionEnd;

                if(areaClassicjs.selectionStart != currentPos){
                    var start = areaClassicjs.selectionStart;
                    value = value.substring(0, start) + value.substring(currentPos, value.length);
                    currentPos = start;
                }
                let print = shft ? xchange[2] : xchange[1];
                value = value.middleAdd(currentPos, print);      
                areaClassic.val(joint(value, d[1][1]));
                areaClassicjs.selectionEnd = currentPos+1;
                
            }}
            clearTimeout(timer);
            timer = setTimeout(translatetoUnicode, 500);
        }
    )
    function translatetoClassic(){
        value = areaUnicode.val() ;
        var keys = ""
        let p = new Promise((resolve) => {
        if (value){
            var juks = d[0][1];
            for(var juk of juks){
                value = value.replaceAll( juk['out'], juk['seq'])
                if (juk == juks[juks.length - 1]){
                    resolve(value);   
                }
            }
        }
        })
        p.then((val)=>{
            
            return new Promise((resolve)=>{
                var temp="";
                for (l of val){
    // debugger     
                    var r = transform(false, l, d[0][0]);
                    
                    if (r){
                        var r2 = transform(parseInt(r[0]),false, d[1][0]);
                        var print;
                        if(!r2){
                            var change = ['0','1','2','3','4','5','6','7','8','9', '!', '@','#','$','%','^','*','(',')','?',',','<','.','>','=','+',':',';','/']
                            var numer =['০','১','২','৩','৪','৫','৬','৭','৮','৯','!','@','#','৳','%','ৰ','*','(',')','?',',','<','.','>','=','+',':',';','/']
                            for(var item of numer){
                                if(l==item){
                                    print=change[numer.indexOf(item)]
                                }
                            }
                        }else{
                            print = (r[3] ? r2[2] : r2[1]);
                        }
                        print=print+temp;
                        temp="";
                        if (print == "‰" ||print == "w"|| print== "‡"){
                            if (keys[keys.length-2] == "&"){
                                if(keys[keys.length-4] == "&"){
                                    keys=keys.middleAdd(keys.length-5, print)
                                }else{
                                    keys = keys.middleAdd(keys.length-3, print)
                                }
                                print = "";
                            }else if (keys[keys.length-1] =="©"){
                                keys = keys.middleAdd(keys.length-2, print)
                                print = "";
                            }else if (keys[keys.length-1] !="&"){
                                keys = keys.middleAdd(keys.length-1, print)
                                print = "";
                            }
                        }else if(print=="&" && keys[keys.length-1]== "i"){
                            if(temp!='‍'){
                                print = "";
                                keys = keys.replaceAt(keys.length-1, "")
                                temp="©";
                            }else{
                                temp=""
                            }
                        }
                        keys+= print;
                    }else if(l=="়"){
                        switch(keys[keys.length-1]){
                            case "h":
                                keys+="q"
                                break;
                            case "W":
                                keys+="o"
                                break;
                            case "X":
                                keys+="p"
                                break;
                            }
                        keys = keys.replaceAt(keys.length-2,"");
                    }else if(l=='‍'){
                        temp=l;
                    }
                    if (l == val[val.length - 1]){
                        resolve()
                    }
                };
            })
        }).then(()=>{
            if (keys.length >=2){                     
                for(var juk of d[1][1]){
                    keys = keys.replaceAll(juk['seq'], juk['out'])
                    
                }
            }
            
            areaClassic.val(keys)
        });
    }
    function translatetoUnicode(){
        value = areaClassic.val() ;
        temp = "";
                    var keys = ""
                    let p = new Promise((resolve) => {
                        if (value){
                            var juks = d[1][1];
                            for(var juk of juks){
                                value = value.replaceAll( juk['out'], juk['seq'])
                                
                                if (juk == juks[juks.length - 1]){
                                    resolve(value);   
                                }
                            }}
                        })
                        
                        p.then( val => {
                    return new Promise((resolve) =>{
                        for (l of val){
                            var r = transform(false, l, d[1][0]);
                            if (r){
                                var r2 = transform(parseInt(r[0]),false, d[0][0]);
                                var print = (r[3] ? r2[2] : r2[1])+temp; //r[3] return if Shift pressed
                                var lastval = keys[keys.length-1];
                                
                                if(lastval != "্"){
                                    switch (print){
                                        case "ে":
                                        case "ৈ":
                                        case "ি":
                                            temp = print;
                                            print = "";
                                            break;
                                        case "র্":
                                            keys = keys.middleAdd(keys.length-1, print);
                                            print="";
                                            break;
                                        case "্":

                                            if(lastval == "ে"|| lastval == "ৈ"|| lastval =="ি"){
                                                temp3 = lastval
                                                temp2 = keys.length+1;
                                                keys = keys.replaceAt(keys.length-1, "")
                                            }
                                            break;
                                        default:
                                            temp ="";
                                    }
                                }
                                keys+= print;
                                if(temp2){
                                    if(keys.length === temp2){
                                        keys += temp3;
                                        temp2 = 0;
                                        temp = ""
                                    }
                                }
                            }else{
                                var numer = ['0','1','2','3','4','5','6','7','8','9', '!', '@','#','$','%','^','*','(',')','?',',','<','.','>','=','+',':',';','/','\n']
                                var change =['০','১','২','৩','৪','৫','৬','৭','৮','৯','!','@','#','৳','%','ৰ','*','(',')','?',',','<','.','>','=','+',':',';','/','\n']
                                for(var item of numer){
                                    if(l==item){
                                        keys+=change[numer.indexOf(item)]
                                    }
                                }
                            }
                            keys = joint(keys, d[0][1])
                            if (l == val[val.length - 1]){
                                resolve()
                            }
                        };
                    });                        
                    }).then(() => {
                        areaUnicode.val(keys)
                    })
    }
    function joint(value, map){
        var sub;
        if(value.length>=5){
            sub = value.substring(value.length-5, value.length);
        }else{
            sub = value;
        }
        for(var juk of map){
            sub = sub.replace(juk['seq'], juk['out'])
        }
        return value.substring(0, value.length-5)+sub;
    }

    $('#copy1').click(()=>{
        navigator.clipboard.writeText(areaClassic.val())
        areaClassic.focus()
        $("#copy1").text('Copied!')
        setTimeout(()=>{$('#copy1').text('Copy')}, 1000)
    })
    $('#copy2').click(()=>{
        navigator.clipboard.writeText(areaUnicode.val())
        areaUnicode.focus()
        $("#copy2").text('Copied!')
        setTimeout(()=>{$('#copy2').text('Copy')}, 1000)
    })
}

function transform(keyCode = false, letter = false, method){
      var syn = keyCode ? "keycode" : "nrml_txt";

      if (letter){
          for (var i=0; i<method.length; i++){
              var k = method[i]
              if (letter == k[syn]){
                return [k['keycode'], k['nrml_txt'], k['sft_txt'], false];
            }else if(letter == k["sft_txt"]){
                return [k['keycode'], k['nrml_txt'], k['sft_txt'], true]
            }
        }
    }else{
        for (var i=0; i<method.length; i++){
            var k = method[i]
            if(keyCode == k[syn]){
                return [k['keycode'], k['nrml_txt'], k['sft_txt'], false];
            }
        }
    }
    }
