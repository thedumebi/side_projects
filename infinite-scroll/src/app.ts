const imgContainer = document.querySelector(
  "#image-container"
) as HTMLDivElement;
const loader = document.querySelector("#loader") as HTMLDivElement;

let ready: boolean = false;
let imagesLoaded: number = 0;
let totalImages: number = 0;
let photosArray: Photos[] = [];

type Photos = {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  categories: string[];
  likes: number;
  liked_by_user: boolean;
  current_user_collections: string[];
  sponsorship: null;
  topic_submissions: {
    nature: {
      status: string;
      approved_on: string;
    };
  };
  user: {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string;
    twitter_username: string | null;
    portfolio_url: string | null;
    bio: string;
    location: string;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
      following: string;
      followers: string;
    };
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    instagram_username: string;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: {
      instagram_username: string;
      portfolio_url: string | null;
      twitter_username: string | null;
      paypal_email: null | string;
    };
  };
  exif: {
    make: string;
    model: string;
    name: string;
    exposure_time: string;
    aperture: string;
    focal_length: string;
    iso: number;
  };
  location: {
    title: null | string;
    name: null | string;
    city: null | string;
    country: null | string;
    position: {
      latitude: null | number;
      longitude: null | number;
    };
  };
  views: number;
  downloads: number;
};

let count: number = 5;
const apiKey: string = "tc2thCnWxdYnng72LDyo0-UDfIQIP41aVrhCftaZWUE";
let apiURL: string = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images are loaded
const imageLoaded = (): void => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;

    // to increase performace
    count = 30;
  }
};

// helper function
const setAttribute = (
  element: HTMLElement,
  attributes: { [prop: string]: string }
): void => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// create elements for links & photos
const displayPhotos = (): void => {
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
const getPhotos = async () => {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();

    // show photos
    displayPhotos();
  } catch (err) {
    console.log({ err });
  }
};

// infinite loading logic
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready === true
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
