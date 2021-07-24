const writeReviewOverlay = async () => {
  const d = document
  const products = d.querySelectorAll(".product")
  const images = d.querySelectorAll(".image")
  const imgs = d.querySelectorAll("img")
  const buttonDiv = d.createElement("div")
  const button = d.createElement("button")

  products.forEach(product => {
    // add style and display button on hover
    product.addEventListener("mouseenter", event => {
      // highlight the mouseenter target
      button.setAttribute("class", "btn")
      buttonDiv.appendChild(button)
      product.insertBefore(buttonDiv, product.firstElementChild)

      const btn = d.querySelector(".btn")
      btn.innerHTML = "Write a review"
      event.target.style.position = "relative"
    })

    // remove style and hide button on mouseleave
    product.addEventListener("mouseleave", event => {
      product.removeChild(buttonDiv)

      images.forEach(image => {
        image.classList.remove("img")
      })

      imgs.forEach(img => {
        img.style.removeProperty("opacity")
      })
      event.target.style.removeProperty("relative")
    })
  })

  //add opacity for all image on hover
  imgs.forEach(img => {
    img.addEventListener("mouseenter", event => {
      event.target.style.opacity = "0.4"
    })
  })

  //add img class for overlay styling
  images.forEach(image => {
    image.addEventListener("mouseenter", event => {
      event.target.classList.add("img")
    })
  })
}
writeReviewOverlay()
