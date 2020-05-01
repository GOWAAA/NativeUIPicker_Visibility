/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//==============================================================================
const Scene = require('Scene'); 
const NativeUI = require('NativeUI'); 
const Textures = require('Textures'); 


Promise.all([
    // Find your objects 
    //make sure you name your object in order back in Spark AR starting from 0
    //e.g Object0, Object1, Object2 etc...
    Scene.root.findByPath('**/object*'),

    Textures.findFirst('Green'),
    Textures.findFirst('Blue'),
    Textures.findFirst('Yellow'),
    Textures.findFirst('Red'),

]).then(results =>{
    let object = results[0];
    let green = results[1];
    let blue = results[2];
    let yellow = results[3];
    let red = results[4];


    //Set default visibility when effect launch
    //Note that when hidden is false, object will be visible
    for(let i = 0; i<object.length; i++){ 
        if (i == 0){ //The first object, object0 will be visible by default. 
            object[i].hidden = false;
        }
        else{
            object[i].hidden = true;    
        }

    //Set index = 0
    const index = 0;

    // Create a configuration object 
    const configuration = { 
    // The index of the selected item in the picker 
    selectedIndex: index, 
    // The image textures (in sequence) to use as the items in the picker 
    // Make sure these textures are set to uncompressed or this *will not work* 
    items: [ 
    {image_texture: green}, 
    {image_texture: blue},
    {image_texture: red},
    {image_texture: yellow}
    ], 
    }

    // Create our picker 
    const picker = NativeUI.picker; 

    // Load the configuration 
    picker.configure(configuration); 

    // Set the visibility to true 
    picker.visible = true; 

    // When the user selects an item form the picker, a new val value will be passed into the loop below 
    picker.selectedIndex.monitor().subscribe(function(val) { 
        for(let i = 0; i<object.length; i++){
            if (i == val.newValue){ 
                //val.newvalue will be 0 when 1st picker is chosen, and 1 when 2nd picker is chosen so on and so forth
                //hence, every time a new picker option is chosen, this for loop will check which picker is chosen and set the corresponding
                //object to be visible
                object[i].hidden = false;
            }
            else{
                object[i].hidden = true;    
            }
        }
    }
    );
    }
});




