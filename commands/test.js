const PornHub = require('pornhub.js');
const ph = new PornHub();

module.exports = {
	name: 'test',
	description: 'Test!',
	execute (msg, args) {
		ph.search('Album', 'boobs')
			.then(res => {
				const albums = res.data;
				const album = albums[Math.floor(Math.random() * albums.length)];

				console.log(albums);
				console.log(albums.length);


				ph.album(album.url)
					.then(res => {
						const photos = res.data.photos;
						// const photo = photos[Math.floor(Math.random() * photos.length)];
						const photo = photos[0];

						ph.photo(photo.url)
							.then((res) => {
								//msg.channel.send(res.data.info.url);
							});
					});

			});
	}
};
