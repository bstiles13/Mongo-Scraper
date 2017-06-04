$(document).ready(function() {

    $(document).on('click', '.home', function() {
            $(location).attr('href', '/');
    })

    $(document).on('click', '.scrape', function() {
        console.log('Scraping');
        $.get('/scrape', function(data) {
            $(location).attr('href', '/');
        })
    })

    $(document).on('click', '.favorites', function() {
        console.log('Favorites');
        $.get('/favorites', function(data) {
            $(location).attr('href', '/favorites');
        })
    })

    $(document).on('click', '.add-favorite', function() {
        var id = $(this).attr('favorite-id');
        $.post('/favorites/' + id, function(data) {
            alert('favorite added');
        })
    })

    $(document).on('click', '.remove', function() {
        var id = $(this).attr('remove-id');
        $.post('/remove/' + id, function(data) {
            alert('removed from favorites');
        })
    })

    $(document).on('click', '.comments', function() {
        var id = $(this).attr('data-id');
        $.get('/comments/' + id, function(data) {
            console.log(data);
            $('.modal').attr('class', 'modal is-active');
            $('.save').attr('save-id', id);
            $('.history').empty();
            for (var i = 0; i < data.comments.length; i++) {
                var newComment = $('<div>').html(data.comments[i]);
                $('.history').append(newComment);
        }
        })
    })

    $(document).on('click', '.save', function() {
        var id = $(this).attr('save-id');
        var comment = {
            comment: $('.new-comment').val()
        }
        console.log(id);
        console.log(comment);
        $.post('/comments/' + id, comment, function(data) {
            console.log('post worked');
            console.log(data);
            $('.history').empty();
            for (var i = 0; i < data.comments.length; i++) {
                var newComment = $('<div>').html(data.comments[i]);
                $('.history').append(newComment);
                console.log(newComment);
        }
        })
    })

    $(document).on('click', '.cancel', function() {
        $('.modal').attr('class', 'modal');
        console.log('complete');
        // $.get('/');
    })
})
