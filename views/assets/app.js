$(document).ready(function() {
    $(document).on('click', '.scrape', function() {
        console.log('Scraping');
        $.get('/scrape', function(data) {
            console.log(data);
        })
    })
})
