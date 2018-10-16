 // image loader to canvas
 
 let imageLoader = document.querySelector('#loader');
    imageLoader.addEventListener('change', handleImage, false);
    let canvas = document.querySelector('#uploadedImg');
    let ctx = canvas.getContext('2d');
    let img = new Image();

    function handleImage(e) {
        let reader = new FileReader();
        reader.onload = function(event)
        {
            img.onload = function()
            {
                ctx.drawImage(img, 0, 0);  
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    
    //  drawing

    document.querySelector('#imageDrawing').onclick = function () {
    let isDrawing = false;
    let type = document.getElementsByName('colors');
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 2;

    canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
    });
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
    
    function draw(e) {

        let n;
        
        for(let i = 0; i < type.length; i++){
            if(type[i].checked)
            {
                n = i;
            }
        }

        switch(n){
           case 0:
            ctx.strokeStyle = "#000000";
           break;
           case 1:
            ctx.strokeStyle = '#f44242';
           break;
           case 2:
            ctx.strokeStyle = '#41f465';
           break;
           case 3:
            ctx.strokeStyle = 'transparent';
           break;
        }

        if(!isDrawing) return;    
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];

    }   
}

    //  brightness 
    
    let brightOldVal;

    brightnessRange.addEventListener('mousemove', () => {
    if (brightnessRange.value !== brightOldVal) {
        setBrightness(Number(brightnessRange.value));
    }
        brightOldVal = Number(brightnessRange.value);
    });

    function setBrightness(value) {
    ctx.filter = `brightness(${value + 100}%)`;
    ctx.drawImage(img, 0, 0);
    }

    //  contrast

    let contrOldVal;

    contrastRange.addEventListener('mousemove', () => {
        if (contrastRange.value !== contrOldVal) {
        setContrast(Number(contrastRange.value));
    }
        contrOldVal = Number(contrastRange.value);
    });

    function setContrast(value) {
        ctx.filter = `contrast(${value + 100}%)`;
        ctx.drawImage(img,0,0);
    }

    //  saturation 
    
    let satOldVal;

    saturationRange.addEventListener('mousemove', () => {
        if (saturationRange.value !== satOldVal) {
        setSaturation(Number(saturationRange.value));
    }
        satOldVal = Number(saturationRange.value);
    });

    function setSaturation(value) {
        ctx.filter = `saturate(${value + 100}%)`;
        ctx.drawImage(img,0,0);
    }
