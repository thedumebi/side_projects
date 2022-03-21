"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const imgContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let count = 5;
const apiKey = "tc2thCnWxdYnng72LDyo0-UDfIQIP41aVrhCftaZWUE";
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// Check if all images are loaded
const imageLoaded = () => {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        // to increase performace
        count = 30;
    }
};
// helper function
const setAttribute = (element, attributes) => {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
};
// create elements for links & photos
const displayPhotos = () => {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // create a tag
        const item = document.createElement("a");
        setAttribute(item, { href: photo.links.html, target: "_blank" });
        // create image tag
        const img = document.createElement("img");
        setAttribute(img, {
            src: photo.urls.regular,
            alt: photo.alt_description || "",
            title: photo.alt_description || "",
        });
        // event listener, check when each is finished loading
        img.addEventListener("load", imageLoaded);
        item.appendChild(img);
        imgContainer.appendChild(item);
    });
};
// get photos from unsplash API
const getPhotos = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(apiURL);
        photosArray = yield response.json();
        // show photos
        displayPhotos();
    }
    catch (err) {
        console.log({ err });
    }
});
// infinite loading logic
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
        ready === true) {
        ready = false;
        getPhotos();
    }
});
getPhotos();
