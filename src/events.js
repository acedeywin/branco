const d = document
const products = d.querySelectorAll(".product")

const writeReviewOverlay = async () => {
  const images = d.querySelectorAll(".image")
  const imgs = d.querySelectorAll("img")
  const buttonDiv = d.createElement("div")
  const button = d.createElement("button")
  const starsDiv = d.createElement("div")
  const starsSpan = d.createElement("span")
  let btn

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
        "fas fa-star",
        "fas fa-star",
        "fas fa-star",
        "fas fa-star",
        "fas fa-star",
      ]
      const singleBtn = d.querySelector(".review-btn")
      const allBtns = d.querySelectorAll(".review-btn")
      for (let pro of products) {
        if (pro !== product) {
          pro.style.pointerEvents = "none"
        }
      }

      for (let btn of allBtns) {
        if (btn !== singleBtn) {
          btn.disabled = true
        }
      }

      singleBtn.classList.add("hide")

      starsSpan.setAttribute("class", "stars")
      starsDiv.appendChild(starsSpan)
      product.appendChild(starsDiv)

      const starIcon = iconClass
        .map(cls => {
          return `<i class="${cls}"></i>`
        })
        .join("")

      const icons = d.querySelector(".stars")
      icons.insertAdjacentHTML("afterbegin", starIcon)
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
        btn.innerHTML = "Write a review"

        for (let pro of products) {
          if (pro !== product) {
            pro.classList.remove("visible")
          }
        }

        // const icons = d.querySelector(".stars")
        //  icons.inse

        starsDiv.removeChild(starsSpan)
        product.removeChild(starsDiv)
        product.addEventListener("click", clickReviewButton)
        product.addEventListener("mouseenter", addReviewButton)
        product.addEventListener("mouseleave", removeReviwButton)
      }
    }

    // const icons = d.querySelectorAll(".fa-star")
    // console.log(icons)

    product.addEventListener("click", clickReviewButton)
    product.addEventListener("click", cancelReview)
    product.addEventListener("mouseenter", addReviewButton)
    product.addEventListener("mouseleave", removeReviwButton)
  })
}
writeReviewOverlay()
