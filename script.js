var cvs = document.createElement('canvas');
var ctx = cvs.getContext('2d');
var originalImageSrc = ''; // เก็บแหล่งที่มาของภาพต้นทาง

function reset() {
    var img = document.getElementById('out');
    img.src = originalImageSrc; // ใช้ภาพต้นทางที่เก็บไว้
}

function openFile(evnt) {
    var img = document.getElementById('out');
    var oimg = document.getElementById('in');
    var f = document.getElementById("uploadimage").files[0];
    var url = window.URL || window.webkitURL;
    var src = url.createObjectURL(f);

    originalImageSrc = src; // เก็บแหล่งที่มาของภาพต้นทาง

    oimg.src = src;
    oimg.onload = function() {
        // ตั้งค่าขนาด canvas ตามขนาดของภาพ
        cvs.width = oimg.naturalWidth;
        cvs.height = oimg.naturalHeight;

        ctx.drawImage(oimg, 0, 0, cvs.width, cvs.height);
        
        // ตั้งขนาดภาพให้ตรงตามขนาดต้นทาง
        var outImg = document.getElementById('out');
        outImg.width = oimg.naturalWidth;
        outImg.height = oimg.naturalHeight;
        
        // ตั้งค่า src ให้ตรงกับต้นทาง
        outImg.src = src;
    }
}

function doIt() {
    var img = document.getElementById('out');
    var factor = document.getElementById('factor').value * 1.0;
    
    var dataUrl = cvs.toDataURL("image/jpeg", factor + Math.random() * 0.1);

    // ตั้งขนาดภาพให้ตรงตามขนาดต้นทาง
    img.onload = function() {
        var oimg = document.getElementById('in');
        img.width = oimg.naturalWidth;
        img.height = oimg.naturalHeight;
    }
    
    img.src = dataUrl;
}

document.getElementById("uploadimage").addEventListener("change", openFile, false);
