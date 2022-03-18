String.prototype.replaceAt = function(index, what) {
    return this.substring(0, index)+ what + this.substring(index +1,  this.length);
}
String.prototype.replaceAll = function(str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 

fetch('./key.json').then(r => r.json()).then(r => {
    asyncCall(r);
} );
var timer = '';
function asyncCall(d) {
    const areaUnicode =$('[name="Unicode"]');
    const areaClassic = $('[name="Classic"]');
    const unicode = d[0][0];
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
                    console.log("Externel...")
                }
                else{
                    e.preventDefault()
                    let value = areaUnicode.val();
                    var lastval = value[value.length-1];
                    
                    let print = (shft ? xchange[2] : xchange[1]) + temp;
                    
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
                                    value = value.replaceAt(value.length-1, "")
                                }
                                break;
                            default:
                                temp =""
                        }
                    }

                    value += print
                    if(temp2){
                        if(value.length === temp2){
                            value += temp3;
                            temp2 = 0;
                            temp = ""
                        }
                    }
                    
                    areaUnicode.val(value);
                    
                    
                }
            
                for(var juk of d[0][1]){
                    areaUnicode.val(areaUnicode.val().replace(juk['seq'], juk['out']))
                }
                clearTimeout(timer)  ;          
                // timer = setTimeout(translatetoClassic, 500)
                translatetoClassic();

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
            if((ctrl || altr)){
                temp =""
            }
            else{
                e.preventDefault()
                value = areaClassic.val()
                let print = shft ? xchange[2] : xchange[1]                
                areaClassic.val(value + print)
                for(var juk of d[1][1]){
                    areaClassic.val(areaClassic.val().replace(juk['seq'], juk['out']))
                }
                
                clearTimeout(timer);
                timer = setTimeout(translatetoUnicode, 500);
            }}
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
                        var thro = (r[3] ? r2[2] : r2[1]);
                        if (thro == "‰" ||thro == "w"|| thro== "‡"){
                            var key;
                            if (keys[keys.length-2] == "&"){
                                key = keys.substring(keys.length-3, keys.length)
                                keys = keys.substring(0, keys.length-3)+thro+key;
                                thro = ""
                                console.log(keys[keys.length-2])
                            }else if (keys[keys.length-1] !="&"){
                                key = keys[keys.length-1];
                                keys = keys.replaceAt(keys.length-1, thro)+key
                                thro = "";
                            }
                        }
                        keys+= thro;
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
                                var thro = (r[3] ? r2[2] : r2[1])+temp;
                                var lastval = keys[keys.length-1];
                            
                                if(lastval != "্"){
                                    switch (thro){
                                        case "ে":
                                            temp = thro;
                                            thro = "";
                                            break;
                                        case "ৈ":
                                            temp = thro;
                                            thro = "";
                                            break;
                                        case "ি":
                                            temp = thro;
                                            thro = "";
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
                                keys+= thro;
                                if(temp2){
                                    if(keys.length === temp2){
                                        keys += temp3;
                                        temp2 = 0;
                                        temp = ""
                                    }
                                }
                            }else{
                                keys+=l;
                                console.log(l)
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
      var syn = keyCode ? "keycode" : "nrml_txt"

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
        for(k of method){
            if ((keyCode||letter) == k[syn]){
                return [k['keycode'], k['nrml_txt'], k['sft_txt']]
            }
        }
    }
 }
 