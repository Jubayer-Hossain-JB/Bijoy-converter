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
                    areaUnicodejs.selectionStart = 0;
                    let currentPos = areaUnicodejs.selectionEnd;
                    areaUnicodejs.selectionStart = currentPos;
                    
                    var lastval;
                    if(currentPos>0){
                        lastval = value[currentPos-1];
                    }else{
                        lastval = "";
                         }
                    
                    let print = (shft ? xchange[2] : xchange[1]) + temp;
                    var tempPos = temp.length
                    if (lastval != "্"){
                        switch (print){
                            case "ে":
                                temp = print;
                                print = ""
                                break;
                            case "ৈ":
                                temp = print;
                                print = ""
                                break;
                            case "ি":
                                temp = print;
                                print = ""
                                break;
                            case "্":
                                if(lastval == "ে"|| lastval == "ৈ"|| lastval =="ি"){
                                    temp3 = lastval
                                    temp2 = value.length+1;
                                    value = value.replaceAt(currentPos-1, "")
                                    currentPos -=1
                                }
                                break;
                            default:
                                temp =""
                            }
                        }
                        
                        value = value.middleAdd(currentPos, print)
                        currentPos += 1+tempPos
                        //value +=print
                        if(temp2){
                        if(value.length === temp2){
                            value.middleAdd(currentPos, temp3) //There can be Error. Because, he can put his last step anywhere.
                            currentPos += 1
                            //value += temp3;
                            temp2 = 0;
                            temp = ""
                        }
                    }
                    
                    areaUnicode.val(value);
                    if(print){
                        if(print=="্র"||print=="্য") currentPos +=1;
                        areaUnicodejs.selectionEnd = currentPos
                        areaUnicodejs.selectionStart = currentPos
                    }
                    
                    
                }
            
                for(var juk of d[0][1]){
                    areaUnicode.val(areaUnicode.val().replace(juk['seq'], juk['out']))
                }
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

                areaClassicjs.selectionStart = 0;
                let currentPos = areaClassicjs.selectionEnd;
                areaClassicjs.selectionStart = currentPos;

                let print = shft ? xchange[2] : xchange[1];
                value = value.middleAdd(currentPos, print);      
                areaClassic.val(value);
                areaClassicjs.selectionStart = currentPos+1;
                areaClassicjs.selectionEnd = currentPos+1;

                for(var juk of d[1][1]){
                    areaClassic.val(areaClassic.val().replace(juk['seq'], juk['out']))
                }
                
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
                for (l of val){
    // debugger
    
                    var r = transform(false, l, d[0][0]);
                    
                    if (r){
                        var r2 = transform(parseInt(r[0]),false, d[1][0]);
                        var print;
                        if(!r2){
                            var change = ['0','1','2','3','4','5','6','7','8','9', '!', '@','#','$','%','^','*','(',')']
                            var numer =['০','১','২','৩','৪','৫','৬','৭','৮','৯','!','@','#','৳','%','ৰ','*','(',')']
                            for(var item of numer){
                                if(l==item){
                                    print=change[numer.indexOf(item)]
                                }
                            }
                        }else{
                            print = (r[3] ? r2[2] : r2[1]);
                        }
                        if (print == "‰" ||print == "w"|| print== "‡"){
                            var key;
                            if (keys[keys.length-2] == "&"){
                                key = keys.substring(keys.length-3, keys.length)
                                keys = keys.substring(0, keys.length-3)+print+key;
                                print = "";
                            }else if (keys[keys.length-1] !="&"){
                                key = keys[keys.length-1];
                                keys = keys.replaceAt(keys.length-1, print)+key
                                print = "";
                            }
                        }
                        keys+= print;
                        if (l == val[val.length - 1]){
                            resolve()
                        }
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
                                            temp = print;
                                            print = "";
                                            break;
                                        case "ৈ":
                                            temp = print;
                                            print = "";
                                            break;
                                        case "ি":
                                            temp = print;
                                            print = "";
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
                                var numer = ['0','1','2','3','4','5','6','7','8','9', '!', '@','#','$','%','^','*','(',')']
                                var change =['০','১','২','৩','৪','৫','৬','৭','৮','৯','!','@','#','৳','%','ৰ','*','(',')']
                                for(var item of numer){
                                    if(l==item){
                                        keys+=change[numer.indexOf(item)]
                                    }
                                }
                            }
                            if (l == val[val.length - 1]){
                                resolve()
                            }
                        };
                    });                        
                    }).then(() => {
                        areaUnicode.val(keys)
                        if (areaUnicode.val().length >=2){
                            for(var juk of d[0][1]){
                                areaUnicode.val(areaUnicode.val().replaceAll(juk['seq'], juk['out']))
                            }
                        }
                    })
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
 
