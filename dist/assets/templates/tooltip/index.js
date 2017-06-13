function my_parser(options) {
    if (!options || !(options.dataSource instanceof Array))return null;
    var dataSource = options.dataSource,
        assignElements = (options.assignElements || [
            [['info_box_header', 'bygg'], ['info_box_title', 'beskrivelse'], ['info_label_title', 'antallrom'], ['id', 'name']],
            ['tooltip.header', 'tooltip.body.title', 'label.title', '_id']
        ]),
        res = {},
        noClone = [],
        copyAssign = function (obj) {
            var temp = obj instanceof Array ? [] : {},
                clone = function (o) {
                    var newTemp;
                    if (typeof(o) == "object" && o != null && noClone.indexOf(o.constructor.name) < 0) {
                        newTemp = copyAssign(o);
                    }
                    else {
                        newTemp = o;
                    }
                    return newTemp;
                };

            for (var i in obj) {
                var field = i.toLowerCase(),
                    matchInd = -1,
                    copyT = temp;

                for (var l = 0; l < assignElements[0].length; l++) {
                    var _m = assignElements[0][l].indexOf(field);
                    if (_m > -1) {
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
                    copyT[i] = clone(obj[i]);
                }
            }
            return temp;
        }, createHtml = function (dataSource) {
            var result = '',
                toolttip = '',
                label = '',
                originalFields = assignElements[1],
                toolTipField = originalFields[1].split('.')[0],
                labelFiled = originalFields[2].split('.')[0];

            if (dataSource[toolTipField]) {
                toolttip += '<div class="cos-tooltip" [ngClass]="{\'active\' : tooltip.active}">';
                var headerT = dataSource[toolTipField][originalFields[0].split('.')[1]],
                    bodyT = dataSource[toolTipField][originalFields[1].split('.')[1]][originalFields[1].split('.')[2]];
                if (headerT) toolttip += '<div class="cos-tooltip-header"><span onselectstart="return false">' + headerT + '</span></div>';
                toolttip += '<hr>';
                if (bodyT) toolttip += '<div class="cos-tooltip-body"> <div class="cos-tooltip-body-title" onselectstart="return false">' + bodyT + '</div></div>';
                toolttip += '</div>';
                result += toolttip;
            }
            if (dataSource[labelFiled]) {
                label += '<div class="cos-label">';
                var labelTxt = dataSource[labelFiled][originalFields[2].split('.')[1]];
                if (labelTxt)label += '<span onselectstart="return false">' + labelTxt + '</span>';
                label += '</div>';
                result += label;
            }
            return result;
        },
        result = copyAssign(dataSource);

    for (var i = 0; i < result.length; i++) {
        result[i].html = createHtml(result[i]);
        for (var l = 0; l < assignElements[1].length; l++) {
            var matchRes = assignElements[1][l].split("."),
                copyT = result[i];
            for (var t = 0; t < matchRes.length; t++) {
                if (t + 1 < matchRes.length) {
                    if (!copyT[matchRes[t]])copyT[matchRes[t]] = {};
                    copyT = copyT[matchRes[t]];
                } else {
                    copyT[matchRes[t]] = copyT[matchRes[t]] === undefined ? 'def value' : copyT[matchRes[t]];
                }
            }
        }
    }

    return result;
}