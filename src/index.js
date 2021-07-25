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

    starsDiv.removeChild(starsSpan)
    product.removeChild(starsDiv)
    product.addEventListener("click", clickReviewButton)
    product.addEventListener("mouseenter", addReviewButton)
    product.addEventListener("mouseleave", removeReviwButton)
  }
}

product.addEventListener("click", cancelReview)
product.addEventListener("click", clickReviewButton)
