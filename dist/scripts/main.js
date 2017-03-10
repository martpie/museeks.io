var Museeks = {

    checkDownloadsCount: function() {

        var oReq = new XMLHttpRequest();

        oReq.onload = function (e) {

            var releases = e.currentTarget.response;
            var count = 0;

            releases.forEach((elem) => {

                elem.assets.forEach((asset) => {
                    count += asset['download_count'];
                })
            });

            console.info('Downloads count: ' + count);
        };

        oReq.open('GET', 'https://api.github.com/repos/KeitIG/museeks/releases', true);
        oReq.responseType = 'json';
        oReq.send();
    }
}
