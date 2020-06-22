'use strict';


//const searchURL = 'https://api.github.com/users/:username/repos';


function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.length; i++){
    // add a list item to the results 
    //list with Name of repo and url
    $('#results-list').append(
      `<li><h3><a href="${responseJson[i].html_url}" target="blank">${responseJson[i].name}</a></h3>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getRepo() {
    const searchTerm = $('#js-search-term').val();
    fetch(`https://api.github.com/users/${searchTerm}/repos`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getRepo();
  });
}

$(watchForm);