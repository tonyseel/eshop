(function() {
    function displaySearchResults(results, store) {
        var searchResults = document.getElementById('posts-archive');

        if (results.length) { // Are there any results?
            var appendString = '';

            for (var i = 0; i < results.length; i++) { // Iterate over the results
                var item = store[results[i].ref];
                appendString += '<li><div class="post-thumb"> <img src="' + item.image + '" class="Thumbnail thumbnail loop-main" width="140" height="90"></div>';
                appendString += '<div class="post-excerpt"><p class="postmetadata"><span><time datetime="2015-08-13" pubdate>' + item.date + '</time></span></p>';
                appendString += '<h2><a href="' + item.url + '" title="Permanent link to' + item.url + '"></a>' + item.title + '</h2>';
                appendString += '<p>' + item.content.substring(0, 150) + '</p><span class="more"><a href="' + item.url + '" rel="nofollow">continue reading &rarr;</a></span></div><div class="cleaner">&nbsp;</div></li>';
            }

            searchResults.innerHTML = appendString;
        } else {
            searchResults.innerHTML = '<li>No results found</li>';
        }
    }

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');

        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');

            if (pair[0] === variable) {
                return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
            }
        }
    }

    var searchTerm = getQueryVariable('s');

    if (searchTerm) {
        document.getElementById('setop').setAttribute("value", searchTerm);

        // Initalize lunr with the fields it will be searching on. I've given title
        // a boost of 10 to indicate matches on this field are more important.
        var idx = lunr(function() {
            this.field('id');
            this.field('title');
            this.field('image');
            this.field('date');
            this.field('category');
            this.field('content', { boost: 10 });
        });

        for (var key in window.store) { // Add the data to lunr
            idx.add({
                'id': key,
                'title': window.store[key].title,
                'image': window.store[key].image,
                'date': window.store[key].date,
                'category': window.store[key].category,
                'content': window.store[key].content
            });

            var results = idx.search(searchTerm); // Get lunr to perform a search
            displaySearchResults(results, window.store); // We'll write this in the next section
        }
    }
})();
