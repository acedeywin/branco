import {
  d,
  products,
  images,
  imgs,
  buttonDiv,
  starsDiv,
  starsSpan,
  questionDiv,
  questionTag,
  reviewDiv,
  textArea,
  countDiv,
  countBox,
  countTextDiv,
  countText,
  form,
  cancelDiv,
  cancelButton,
  button,
  url,
  iconTags,
} from "./utils.js"

const clicked = []

products.forEach(product => {
  // add style and display button on hover
  const addOverlayButton = () => {
    button.setAttribute("class", "review-btn")
    buttonDiv.appendChild(button)
    product.appendChild(buttonDiv)

    const btn = d.querySelector(".review-btn")
    btn.innerHTML = "Write a review"

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
  const removeOverlayButton = () => {
    product.removeChild(buttonDiv)

    images.forEach(image => {
      image.classList.remove("img")
    })

    imgs.forEach(img => {
      img.style.removeProperty("opacity")
    })
    product.style.removeProperty("relative")
  }

  //when user click on the review button
  const clickReviewButton = () => {
    const reviewButtons = d.querySelectorAll(".review-btn")

    for (let prod of products) {
      if (prod !== product) {
        prod.classList.add("disabled")
      }
    }

    //disabled other products
    reviewButtons.forEach(singleButton => {
      const reviewButton = () => {
        singleButton.classList.add("hide")

        //add the rating stars
        starsSpan.setAttribute("class", "stars")
        starsDiv.appendChild(starsSpan)
        product.appendChild(starsDiv)

        const icons = d.querySelector(".stars")
        icons.innerHTML = iconTags

        //add a cancel button to cancel review
        cancelButton.setAttribute("class", "cancel-btn")
        cancelDiv.appendChild(cancelButton)
        product.appendChild(cancelDiv)

        const cancel = d.querySelector(".cancel-btn")
        cancel.textContent = "Cancel"

        //remove any other product event listener
        product.removeEventListener("click", clickReviewButton)
        product.removeEventListener("mouseenter", addOverlayButton)
        product.removeEventListener("mouseleave", removeOverlayButton)
      }
      singleButton.addEventListener("click", reviewButton)
    })
  }

  //cancel review before you even start
  const cancelReview = () => {
    const cancelButton = d.querySelectorAll(".cancel-btn")

    cancelButton.forEach(button => {
      const cancel = () => {
        window.location.reload()
      }

      button.addEventListener("click", cancel)
    })
  }

  //setting ratings when clicked
  const setRating = () => {
    const stars = d.querySelectorAll(".stars .fa-star")
    const starsSpan = d.querySelector(".stars")
    const cancel = d.querySelectorAll(".cancel-btn")

    stars.forEach((star, index) => {
      const starClicked = () => {
        //check if a star index is less than the clcked star and set as clicked
        stars.forEach((clicked, clickedIndex) => {
          if (clickedIndex <= index) {
            clicked.classList.add("clicked")
          }
        })

        //hide cancel button
        cancel.forEach(hideCancel => {
          hideCancel.classList.add("hide")
        })

        //add textarea
        starsSpan.classList.remove("stars")
        starsSpan.classList.add("disabled")
        starsSpan.classList.add("move-stars")
        questionTag.setAttribute("class", "question")
        textArea.setAttribute("class", "review")
        textArea.setAttribute("type", "text")
        textArea.setAttribute("name", "review")
        textArea.setAttribute("id", "review")
        textArea.setAttribute("placeholder", "Let us know your thought")
        questionDiv.appendChild(questionTag)
        reviewDiv.appendChild(textArea)
        form.appendChild(questionDiv)
        form.appendChild(reviewDiv)

        //add submit button
        button.setAttribute("class", "submit-btn")
        buttonDiv.appendChild(button)
        form.appendChild(buttonDiv)
        product.appendChild(form)

        const submitButton = d.querySelector(".submit-btn")
        submitButton.textContent = "Submit"
        submitButton.disabled = true
        submitButton.classList.add("disabled-btn")

        const label = d.querySelector(".question")
        //store the rating in an array
        clicked.push(index + 1)

        //check if rating is low or high and add the necessary label
        parseInt(clicked[0]) <= 2
          ? (label.textContent = "What's wrong with it?")
          : (label.textContent = "Any highlight you would like to share?")
      }
      star.addEventListener("click", starClicked)
    })
  }

  //set count input
  const setCount = () => {
    const reviewText = d.querySelectorAll(".review")

    reviewText.forEach(review => {
      //add count indicator when textaea is on focus
      const onFocus = () => {
        countBox.setAttribute("readonly", "true")
        countBox.setAttribute("class", "count")
        countBox.setAttribute("type", "text")
        countBox.setAttribute("name", "count")
        countBox.setAttribute("size", "3")
        countBox.setAttribute("maxlength", "3")
        countBox.setAttribute("value", "210")
        countText.setAttribute("class", "count-text")

        countDiv.appendChild(countBox)
        countTextDiv.appendChild(countText)
        product.appendChild(countDiv)
        product.appendChild(countTextDiv)

        const submitButton = d.querySelector(".submit-btn")
        submitButton.textContent = "Submit"

        //check if user input is valid
        const validText = review.value.trim()

        //enable button if input is valid and vice verse
        validText.length > 10
          ? (submitButton.disabled = false)
          : (submitButton.disabled = true)

        //supporting text for input counter
        const addCountText = d.querySelector(".count-text")
        addCountText.textContent = "characters remaining"
      }

      //remove count indicator when on blur
      const onBlur = () => {
        const countText = d.querySelector(".count-text")
        const count = d.querySelector(".count")
        count.classList.add("visible")
        countText.classList.add("visible")
      }

      review.addEventListener("focus", onFocus)
      review.addEventListener("blur", onBlur)
    })
  }

  //set user input limit
  const setCharacterLimit = () => {
    const reviewText = d.querySelectorAll(".review")
    const counts = d.querySelectorAll(".count")
    const counterText = d.querySelectorAll(".count-text")

    reviewText.forEach(review => {
      const textCounter = () => {
        counts.forEach(count => {
          //max charcater is 210
          const maxAmount = 210
          //check if user is greater than max character
          review.value.length > maxAmount
            ? //if input is greater than max character set textarea to only have
              //the amount of max character entered and nothing more
              (review.value = review.value.substring(0, maxAmount))
            : //set count indicator value
              (count.value = maxAmount - review.value.length)

          //adjust the count supporting text as count changes accordingly
          counterText.forEach(text => {
            if (window.screen.width > 1024) {
              if (count.value <= 9) {
                text.style.width = "89%"
              } else if (count.value <= 99) {
                text.style.width = "86%"
              } else {
                text.style.width = "81%"
              }
            } else {
              if (count.value <= 9) {
                text.style.width = "85%"
              } else if (count.value <= 99) {
                text.style.width = "80%"
              } else {
                text.style.width = "75%"
              }
            }
          })
        })

        const validText = review.value.trim()
        //enable submit button if user valid input is greater than 10 characters and vice verse
        const btn = d.querySelector(".submit-btn")
        if (validText.length > 10) {
          btn.disabled = false
          btn.classList.remove("disabled-btn")
          btn.classList.add("enabled-btn")
        } else {
          btn.disabled = true
          btn.classList.remove("enabled-btn")
          btn.classList.add("disabled-btn")
        }
      }

      review.addEventListener("keyup", textCounter)
      review.addEventListener("keydown", textCounter)
    })
  }

  //post review to fake API
  const postReview = () => {
    const cancel = d.querySelectorAll(".cancel-btn")
    const reviewText = d.querySelectorAll(".review")
    const submitButtons = d.querySelectorAll(".submit-btn")
    const spans = d.querySelectorAll("span")
    const rating = clicked[0]
    let loading = false
    let productId
    let comment
    let status

    products.forEach((prod, index) => {
      if (prod == product) {
        productId = index + 1
      }
    })

    submitButtons.forEach(submit => {
      const review = async e => {
        reviewText.forEach(review => {
          //get only valid input as comment
          comment = review.value.replace(/\s+/g, " ")
        })
        //hide cancel button
        cancel.forEach(hideCancel => {
          hideCancel.classList.add("hide")
        })

        spans.forEach(span => {
          span.classList.add("hide")
        })

        submit.classList.remove("hide")
        const data = { productId, rating, comment }
        const headers = {
          "Content-Type": "application/json",
        }

        loading = true
        //set loading icon if loading is true
        if (loading === true) {
          submit.innerHTML = `<i class="fas fa-circle-notch fa-spin"></i>`
          submit.disabled = true
        }

        //make a post request to fake API
        e.preventDefault()
        await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        })
          .then(response => {
            //error handling
            if (!response.ok) {
              submit.innerHTML = `<i class="fas fa-times"></i>`
              submit.disabled = false
              status = d.querySelector(".fa-times")
              status.style.color = "red"
              loading = false
            }
            loading = true
            return response.json()
          })
          .then(response => {
            //handle success
            submit.innerHTML = `<i class="fas fa-check"></i>`
            submit.disabled = true
            status = d.querySelector(".fa-check")
            status.style.color = "green"
            textArea.classList.add("hide")
            questionTag.classList.add("hide")
            loading = false

            //refresh page if post is successful
            setTimeout(() => {
              window.location.reload()
            }, 4000)
          })
          .catch(error => {
            //error handling
            submit.innerHTML = `<i class="fas fa-times"></i>`
            submit.disabled = false
            status = d.querySelector(".fa-times")
            status.style.color = "red"
            loading = false
          })
      }

      submit.addEventListener("click", e => {
        review(e)
      })
    })
  }

  //handle product events
  product.addEventListener("mouseenter", addOverlayButton)
  product.addEventListener("mouseleave", removeOverlayButton)
  product.addEventListener("click", clickReviewButton)
  product.addEventListener("click", cancelReview)
  product.addEventListener("click", setRating)
  product.addEventListener("click", setCount)
  product.addEventListener("click", setCharacterLimit)
  product.addEventListener("click", postReview)
})
