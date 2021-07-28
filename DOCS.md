1. I added a cancel button just right under the review stars after a user clicks on the review button. A user may mistakenly click on the wrong review button and will want to cancel immediately. Instead of using the refresh button, why not add a button that gives users the option to cancel right away. The cancel button basically refreshes the page and let you start afresh.

2. For data integrity and to avoid malicious usage of the review functionality, I added a few criteria checks to the review text box.

a. Users can only input 210 characters of whatever they have to write. Of course, this is a review functionality that would enable users to rate a product, but we wouldn't want them to tell us all their life stories! Rather we would only want them to give us their opinion as brief and informative as they can. There would be lots of data, and we wouldn't want to overwhelm the data analysis guys.

b. Users are only allowed to sent reviews with not less than 10 characters. Yes, we don't want lots of information, but we also do not want users to send a couple of meaningless texts.

So in order for these criteria to work perfectly, I implemented the following:
a. A count indicator that shows users the amount of characters remaining for them to type.
b. A check to make sure invalid characters like whitespaces are not submitted.
c. If valid characters entered is less than 10, the submit button will be disable and vice verse.

3. The final touch - when a user successfully submit review, the checked (success) button comes up hiding the overlay, and the page refreshes after 4 seconds.

4. A drawback is that on desktop view, users would have have to double-click on the review button and rating stars (product click event listener has to be called, and then the button and rating click event listeners), and this may affect the user's experience.

5. And of course, I added some color to the success and failure icons :)
