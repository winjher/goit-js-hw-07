import { galleryItems } from "./gallery-items.js";
// Change code below this line

// Let's break down the code into simple steps with an easy-to-understand explanation:

// 1. Start with the Photos:

// We have a bunch of photos saved in a file named 'gallery-items.js'. Think of this file like a photo album where each photo has details such as a small version (preview), a big version (original), and a little story or description about the photo.

// 2. Find Where to Show the Photos on the Webpage:

// Imagine the webpage is a room, and we're looking for a specific wall labeled "gallery" where we want to hang our photos.

const galleryList = document.querySelector(".gallery");

// 3. Prepare Each Photo for Display:

//  For every photo in our album, we do the following:
// We create a small display area (like a small picture frame) marked as "gallery__item".
// Inside this area, we put a link (like a way to view the photo in full size). This link points to the big version of the photo.

// We then add the small version of the photo inside this link so it can be seen in our gallery. We also make sure this photo knows where its big version is stored (this is for when someone wants to see it in full size) and what its story or description is (so people know what they're looking at).

const createGallery = (galleryItems) => {
  const galleryMarkup = galleryItems
    .map((galleryItem) => {
      const { preview, original, description } = galleryItem;

      return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`;
    })
    .join("");
  return galleryMarkup;
};

// 4. Hang the Photos on the Wall:

// After preparing all our photos, we take the entire collection (now ready for display) and put it up on our "gallery" wall on the webpage.

const photosMarkup = createGallery(galleryItems);
console.log(photosMarkup);
galleryList.insertAdjacentHTML("beforeend", photosMarkup);

// 5. Make the Photos Interactive:

// Now, we want to make these photos do something when someone clicks on them:
// If someone clicks on a photo, we stop the usual click action (which might try to open the photo in a new page) because we have a special plan for it.
// We check if the click was really on a photo and not just anywhere in the area.
// If it was on a photo, we find the big version of that photo (remember, each photo knows where its big version is stored).
// We then show this big photo in a special pop-up view (like opening a digital photo frame that shows just this one big photo).

const handleGalleryClick = (event) => {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  const urlOriginal = event.target.dataset.source;
  console.log(urlOriginal);

  //   create new basicLightBox instance
  const instance = basicLightbox.create(`<img src="${urlOriginal}">`);
  instance.show();

  // 6. Let People Close the Big Photo View:

  // When someone is looking at the big photo in the pop-up view, they might want to close it and go back to the gallery. We make sure they can do this by pressing the "Escape" key on their keyboard.
  // If someone presses "Escape", we close the big photo view and make sure that pressing "Escape" again doesn't do anything unless they open another photo.

  //   handleOnEscKeyPress
  const handleOnEscKeyPress = (event) => {
    if (event.key === "Escape") {
      instance.close();
      window.removeEventListener("keydown", handleOnEscKeyPress);
    }
  };

  window.addEventListener("keydown", handleOnEscKeyPress);
};

// 7. Setting Up the Gallery:

// Finally, we make sure that our "gallery" wall is ready to show off the photos and interact with visitors. When someone clicks on a photo, all the steps to show the big version in a pop-up view are ready to go.
// This guide turns the original code into a step-by-step story of how we display photos in an online gallery, make them clickable to view larger versions, and allow users to close the enlarged view with the "Escape" key.

galleryList.addEventListener("click", handleGalleryClick);

// //-----------------------------------------
// // console.log(galleryItems);
