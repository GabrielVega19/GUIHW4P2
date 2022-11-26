// GUI Assignment: HW4
// Gabriel Vega, UMass Lowell Computer Science, gabriel_vega@student.uml.edu
$(function() {
    let tabCount = 1
    //validates all the input for the mult table form and includes all the nessisary validators and attaches the function to be called on a valid submit
    $("#myForm").validate({
        rules: {
            x1: {
                required: true,
                range: [-50, 50],
                number: true
            }, 
            x2: {
                required: true,
                range: [-50, 50],
                number: true,
                gteqx: true
            }, 
            y1: {
                required: true,
                range: [-50, 50],
                number: true
            }, 
            y2: {
                required: true,
                range: [-50, 50],
                number: true,
                gteqy: true
            }
        }, 
        //sets error messages for every invalid input in the form
        messages: {
            x1: {
                required: "Please enter a number for this field",
                range: "Please enter a number between -50 and 50"
            }, 
            x2: {
                required: "Please enter a number for this field",
                range: "Please enter a number between -50 and 50",
            }, 
            y1: {
                required: "Please enter a number for this field",
                range: "Please enter a number between -50 and 50"
            }, 
            y2: {
                required: "Please enter a number for this field",
                range: "Please enter a number between -50 and 50",
            }
        },
        submitHandler: function(form, e) {
            //prevents the default behavior when the submit button gets pressed 
            e.preventDefault();
            
            //sets up the tab id and header name 
            let tabId = `table${tabCount}`;
            //increments the tab count for the next table
            tabCount++;
            let tabName = `${$("#x1").val()}, ${$("#x2").val()}, ${$("#y1").val()}, ${$("#y2").val()}`;
            
            //adds the list entry for the tab header for the current tab
            $("ul").append(`<li><a href="#${tabId}">${tabName}</a></li>`);
            //adds the div that will hold the content from the table for the current tab 
            $("#myTabs").append(`<!-- html for ${tabId} -->
            <div id="${tabId}" class="bg-black bg-opacity-50 rounded-lg px-6 py-4 max-w-[800px] max-h-[600px] overflow-auto">
                <p class="text-xl font-bold text-white mb-3 text-center">Multiplication Table</p>
            </div>`);

            //calculates the length of the x and y arrays 
            const xLen = ($("#x2").val() - $("#x1").val()) + 1;
            const yLen = ($("#y2").val() - $("#y1").val()) + 1;

            //generates the multiplication table and axis headers
            const xValues = new Array(xLen);
            const yValues = new Array(yLen);
            const multTable = new Array(yLen);

            //sets the values for the x and y headers
            for (let i = 0; i < xLen; i++){
                xValues[i] = parseInt($("#x1").val()) + i;
            }
            for (let i = 0; i < yLen; i++){
                yValues[i] = parseInt($("#y1").val()) + i;
            }

            for (let y = 0; y < yLen; y++){
                multTable[y] = Array(xLen);
                for (let x = 0; x < xLen; x++){
                    multTable[y][x] = xValues[x] * yValues[y];
                }
            }

            //Creates an empty table 
            let tabNode = $("<table>");

            //appends the top header to the table
            let tr = $("<tr>");
            for (let i = 0; i < (xLen + 1); i++) {
                if (i == 0){
                    tr.append($("<th>"));
                } else{
                    tr.append(`<th>${xValues[i-1]}</th>`);
                }
            }
            tabNode.append(tr);

            //appends rest of the rows to the table 
            for (let y = 0; y < yLen; y++){
                tr = $("<tr>");
                for (let x = 0; x < (xLen + 1); x++){
                    if (x == 0){
                        tr.append(`<th>${yValues[y]}</th>`);
                    } else{
                        tr.append(`<td>${multTable[y][x-1]}</td>`);
                    }
                }
                tabNode.append(tr);
            }
            
            //adds the table to the corrolating div for the new tab 
            $(`#${tabId}`).append(tabNode);
            //refreshes the tabs to include the new added tab 
            $("#myTabs").tabs("refresh");
        }
    });

    //validates all the input for the delete table form and includes all the nessisary validators and attaches the function to be called on a valid submit
    $("#deleteForm").validate({
        rules: {
            delete: {
                indexInRange: true,
            }
        },
        submitHandler: function(form, e){
            e.preventDefault();
        
            const delInd = $("#delete").val().split(',').map(element => {
                return Number(element);
            });
            const delArr = [];
            for (ind of delInd){
                delArr.push($("ul").children()[ind]);
            }
            for (node of delArr){
                node.remove();
            }
        }
    });

    //binds the text input changes to the slider 
    $("#x1").on("change", function(e){
        $("#x1Slider").slider( "option", "value", e.currentTarget.value);
    });
    $("#x2").on("change", function(e){
        $("#x2Slider").slider( "option", "value", e.currentTarget.value);
    });
    $("#y1").on("change", function(e){
        $("#y1Slider").slider( "option", "value", e.currentTarget.value);
    });
    $("#y2").on("change", function(e){
        $("#y2Slider").slider( "option", "value", e.currentTarget.value);
    });

    //Sets up the sliders and sets the min/max values and binds the slider changes to the text input completing the two way binding
    $("#x1Slider").slider({
        max: 50,
        min: -50,
        change: function (e, ui) {
            $("#x1").val(ui.value);
            $("#myForm").submit();
        }
    });
    $("#x2Slider").slider({
        max: 50,
        min: -50,
        change: function (e, ui) {
            $("#x2").val(ui.value);
            $("#myForm").submit();
        }
    });
    $("#y1Slider").slider({
        max: 50,
        min: -50,
        change: function (e, ui) {
            $("#y1").val(ui.value);
            $("#myForm").submit();
        }
    });
    $("#y2Slider").slider({
        max: 50,
        min: -50,
        change: function (e, ui) {
            $("#y2").val(ui.value);
            $("#myForm").submit();
        }
    });

    //creates the tab interface
    $("#myTabs").tabs();
});

//creates new validator to make sure that the xend is greater or equal to xstart 
jQuery.validator.addMethod(
    "gteqx", 
    function(value, element) {
        const xLen = ($("#x2").val() - $("#x1").val()) + 1;

        //makes sure the make sure the second value was greater than the first one 
        if (xLen <= 0){
            return false;
        }
        else{
            return true
        }
    }, 
    "Make sure X End is greater than or equal to X Start"
);

//creates new validator to make sure that the yend is greater or equal to ystart 
jQuery.validator.addMethod(
    "gteqy", 
    function(value, element) {
        const yLen = ($("#y2").val() - $("#y1").val()) + 1;

        //makes sure the make sure the second value was greater than the first one 
        if (yLen <= 0){
            return false;
        }
        else{
            return true
        }
    }, 
    "Make sure Y End is greater than or equal to Y Start"
);

//creates new validator to make sure that the tab index's you enter exist so there are no errors 
jQuery.validator.addMethod(
    "indexInRange", 
    function(value, element) {
        //gets the number of tabs
        let tabNum = $("ul").children().length - 1
        //turns the input into a list of numbers
        const delInd = value.split(',').map(element => {
            return Number(element);
        });
        //loops through the entered indicies and then makes sure they are all less than the number of tabs 
        for (ind of delInd){
            if (ind > tabNum || ind == 0){
                return false;
            }
        }
        return true;
    }, 
    "Make sure that the tab you are trying to delete exists"
);

