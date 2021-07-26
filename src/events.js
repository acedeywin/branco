const d = document
const products = d.querySelectorAll(".product")

const images = d.querySelectorAll(".image")
const imgs = d.querySelectorAll("img")
const buttonDiv = d.createElement("div")
const button = d.createElement("button")
const starsDiv = d.createElement("div")
const starsSpan = d.createElement("span")
const questionDiv = d.createElement("div")
const questionTag = d.createElement("p")
const reviewDiv = d.createElement("div")
const textArea = d.createElement("textarea")

let btn
let clicked = []

products.forEach(product => {
  // add style and display button on hover

  const addReviewButton = () => {
    button.setAttribute("class", "review-btn")
    buttonDiv.appendChild(button)
    product.appendChild(buttonDiv)

    btn = d.querySelector(".review-btn")
    btn.innerHTML = "Write a review"
    product.style.position = "relative"

    // add opacity for all image on hover
    imgs.forEach(img => {
      img.addEventListener("mouseenter", event => {
        event.target.style.opacity = "0.4"
      })
    })

    //add img class for overlay styling ml
    images.forEach(image => {
      image.addEventListener("mouseenter", event => {
        event.target.classList.add("img")
      })
    })
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

  const clickReviewButton = () => {
    const iconClass = [
      `<i class="fas fa-star"></i>`,
      `<i class="fas fa-star"></i>`,
      `<i class="fas fa-star"></i>`,
      `<i class="fas fa-star"></i>`,
      `<i class="fas fa-star"></i>`,
    ]
    let singleButton = d.querySelector(".review-btn")
    const allButtons = d.querySelectorAll(".review-btn")
    for (let prod of products) {
      if (prod !== product) {
        prod.classList.add("disabled")
      }
    }

    for (let btn of allButtons) {
      if (btn !== singleButton) {
        btn.disabled = true
      }
    }

    singleButton.classList.add("hide")
    //singleButton.textContent = "Cancel"

    starsSpan.setAttribute("class", "stars")
    starsDiv.appendChild(starsSpan)
    product.appendChild(starsDiv)

    // button.setAttribute("class", "cancel-btn")
    // buttonDiv.appendChild(button)
    // product.appendChild(buttonDiv)

    // btn = d.querySelector(".cancel-btn")
    // btn.textContent = "Cancel"

    const icons = d.querySelector(".stars")
    iconClass
      .map(cls => {
        icons.insertAdjacentHTML("afterbegin", cls)
      })
      .join("")

    product.removeEventListener("mouseenter", addReviewButton)
    product.removeEventListener("click", clickReviewButton)
    product.removeEventListener("mouseleave", removeReviwButton)

    // button.setAttribute("class", "cancel-btn")
    // buttonDiv.appendChild(button)
    // product.appendChild(buttonDiv)

    // btn = d.querySelector(".cancel-btn")
    // btn.innerHTML = "Cancel"
    //product.style.position = "relative"
  }

  const cancelReview = () => {
    if (btn.innerHTML === "Cancel") {
      button.classList.remove("hide")
      button.setAttribute("class", "review-btn")
      buttonDiv.appendChild(button)
      product.appendChild(buttonDiv)
      btn = d.querySelector(".review-btn")
      btn.textContent = "Write a review"

      for (let prod of products) {
        if (prod !== product) {
          prod.classList.remove("disabled")
        }
      }

      starsDiv.removeChild(starsSpan)
      product.removeChild(starsDiv)
      product.addEventListener("click", clickReviewButton)
      product.addEventListener("mouseenter", addReviewButton)
      product.addEventListener("mouseleave", removeReviwButton)
    }
  }

  const setRating = () => {
    const stars = d.querySelectorAll(".stars .fa-star")
    const starsSpan = d.querySelector(".stars")
    console.log(stars)

    stars.forEach((star, index) => {
      const starClicked = () => {
        stars.forEach((clicked, clickedIndex) => {
          if (clickedIndex <= index) {
            clicked.classList.add("clicked")
          }
        })

        starsSpan.classList.remove("stars")
        starsSpan.classList.add("disabled")
        starsSpan.classList.add("move-stars")
        questionTag.setAttribute("class", "question")
        textArea.setAttribute("class", "review")
        textArea.setAttribute("type", "text")
        textArea.setAttribute("id", "review")
        textArea.setAttribute("placeholder", "Let us know your thought")
        questionDiv.appendChild(questionTag)
        reviewDiv.appendChild(textArea)
        product.appendChild(questionDiv)
        product.appendChild(reviewDiv)

        button.setAttribute("class", "submit-btn")
        buttonDiv.appendChild(button)
        product.appendChild(buttonDiv)
        btn = d.querySelector(".submit-btn")
        btn.textContent = "Submit"

        const label = d.querySelector(".question")

        clicked.push(index + 1)

        parseInt(clicked[0]) <= 2
          ? (label.textContent = "What's wrong with it?")
          : (label.textContent = "Any highlight you would like to share?")

        const reviewText = d.getElementsByClassName("review")

        console.log(reviewText.value)
      }
      star.addEventListener("click", starClicked)
    })
    console.log(clicked)
  }

  product.addEventListener("click", setRating)
  product.addEventListener("click", clickReviewButton)
  product.addEventListener("click", cancelReview)
  product.addEventListener("mouseenter", addReviewButton)
  product.addEventListener("mouseleave", removeReviwButton)
})
