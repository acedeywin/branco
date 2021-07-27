const clickReviewButton = () => {
  for (let pro of products) {
    if (pro !== product) {
      //pro.classList.add("visible")
      //pro.removeEventListener("click", clickReviewButton)
      pro.removeEventListener("mouseenter", addReviewButton)
      pro.removeEventListener("mouseleave", removeReviwButton)
      button.style.display = "none"
    }
  }

  starsSpan.setAttribute("class", "stars")
  starsDiv.appendChild(starsSpan)
  product.appendChild(starsDiv)

  const icons = d.querySelector(".stars")
  icons.insertAdjacentHTML("afterbegin", starIcon)

  product.removeEventListener("click", clickReviewButton)
  product.removeEventListener("mouseenter", addReviewButton)
  product.removeEventListener("mouseleave", removeReviwButton)

  button.setAttribute("class", "cancel-btn")
  buttonDiv.appendChild(button)
  product.appendChild(buttonDiv)

  btn = d.querySelector(".cancel-btn")
  btn.innerHTML = "Cancel"
  //product.style.position = "relative"
}

//remove style and hide button on mouseleave
const removeReviwButton = () => {
  product.removeChild(buttonDiv)

  images.forEach(image => {
    image.classList.remove("img")
  })

  imgs.forEach(img => {
    img.style.removeProperty("opacity")
  })
  product.style.removeProperty("relative")
}

const cancelReview = () => {
  if (btn.innerHTML === "Cancel") {
    button.classList.remove("hide")
    button.setAttribute("class", "review-btn")
    buttonDiv.appendChild(button)
    product.appendChild(buttonDiv)
    btn = d.querySelector(".review-btn")
    btn.innerHTML = "Write a review"

    for (let pro of products) {
      if (pro !== product) {
        pro.classList.remove("visible")
      }
    }

    //  const icons = d.querySelector(".stars")
    //  icons.inse

    //We wouldn't wanr them to tell us all their life story in a review.
    //we would want their review to specify and straight to the point.

    starsDiv.removeChild(starsSpan)
    product.removeChild(starsDiv)
    product.addEventListener("click", clickReviewButton)
    product.addEventListener("mouseenter", addReviewButton)
    product.addEventListener("mouseleave", removeReviwButton)
  }
}

product.addEventListener("click", cancelReview)
product.addEventListener("click", clickReviewButton)

submitButton.innerHTML = `<a><i class="fas fa-times fa-2x"></i></a>`
submitButton.style.padding = "9px 65px"
submitButton.style.left = "110px"
