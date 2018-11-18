var t = 0;
function add(){
    t = t +1;
    return t;
}

function initValue(initV){
    t = initV;
}

export { add, initValue }
