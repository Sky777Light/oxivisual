function my_parser(options) {
    if (!options || !(options.dataSource instanceof Array) )return null;
    var dataSource = options.dataSource,
        assignElements = (options.assignElements || [
            [['info_box_header','bygg'], ['info_box_title','beskrivelse'], ['info_label_title'], ['id','name']],
            ['tooltip.header', 'tooltip.title', 'label.title', '_id']
        ]),
        res = {},
        noClone = [],
        copyAssign = function (obj) {
            var temp = obj instanceof Array ? [] : {},
                clone = function (o) {
                    var newTemp ;
                    if (typeof(o) == "object" && o != null && noClone.indexOf(o.constructor.name) < 0) {
                        newTemp = copyAssign(o);
                    }
                    else {
                        newTemp  = o;
                    }
                    return newTemp;
                };

            for (var i in obj) {
                var field = i.toLowerCase(),
                    matchInd = -1,
                    copyT = temp;

                for(var l=0; l < assignElements[0].length; l++){
                    var _m = assignElements[0][l].indexOf(field);
                    if( _m > -1){
                        matchInd = l;
                        break;
                    }
                }
                if (matchInd > -1) {
                    var matchRes = assignElements[1][matchInd].split(".");
                    for (var t = 0; t < matchRes.length; t++) {
                        if (t + 1 < matchRes.length) {
                            if (!copyT[matchRes[t]])copyT[matchRes[t]] = {};
                            copyT = copyT[matchRes[t]];
                        } else {
                            copyT[matchRes[t]] = clone(obj[i])
                        }
                    }
                } else {
                    copyT[i] =clone(obj[i]);
                }
            }
            return temp;
        },
        result = copyAssign(dataSource);

    for(var i=0;i< result.length;i++){
        for(var l=0; l < assignElements[1].length; l++){
            var matchRes = assignElements[1][l].split("."),
                copyT = result[i];
            for (var t = 0; t < matchRes.length; t++) {
                if (t + 1 < matchRes.length) {
                    if (!copyT[matchRes[t]])copyT[matchRes[t]] = {};
                    copyT = copyT[matchRes[t]];
                }
            }
        }
    }

    return result;
}