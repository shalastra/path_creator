$(document).ready(function() {
    var ARR_WIDTH = 50;
    var ARR_HEIGHT = 25;

    var selectedColor = '#7B88D1';

    function createArray() {
        var x = new Array(ARR_HEIGHT);

        for(var i = 0; i<ARR_HEIGHT; i++) {
            x[i] = new Array(ARR_WIDTH);
        }

        return x;
    }

    function initMapWithFalse(param) {
        for(var i = 0; i<param.length; i++) {
            for(var j = 0; j<param[i].length; j++) {
                param[i][j] = false;
            }
        }
    }

    function createHtmlTable() {
        var table = $('<table frame="box"></table>').addClass('table-grid');

        for(i=0; i<ARR_HEIGHT; i++) {
            var row_position = 'row-' + i;
            var row = $('<tr></tr>').addClass(row_position);

            for(j=0; j<ARR_WIDTH; j++) {
                var cell_position = 'cell-' + j;
                var cell = $('<td></td>').addClass(cell_position);
                row.append(cell);
            }
            table.append(row);
        }
        $('#app').append(table);
    }

    function initFirstSelectedCell() {
        $('tr.row-0').find('td.cell-0')
            .css('background-color', selectedColor)
            .addClass('current');
        map[0][0] = true;
    }

    var map = createArray();
    initMapWithFalse(map);

    createHtmlTable();

    initFirstSelectedCell();

    $('.current').keydown(function (e) {
       if(e.which == 40) {
           console.log('Up was pressed');
       }
    });
});