const axios = require('axios');
const xml2js = require('xml2js');
const Post = require('../models/Post');

const fetchRSS = async () => {
    try {
        const response = await axios.get('https://lifehacker.com/rss');
        const rssData = response.data;

        const parser = new xml2js.Parser();
        const result = await parser.parseStringPromise(rssData);

        const items = result.rss.channel[0].item;

        const promises = items.map(async (item) => {
            try {
                const link = item.guid[0]['_'];
                const existingPost = await Post.findOne({ link });

                if (!existingPost) {
                    const post = new Post({
                        title: item.title[0],
                        link,
                        pubDate: new Date(item.pubDate[0]),
                        description: item.description[0],
                        thumbnail: item['media:thumbnail'] ? item['media:thumbnail'][0]['$'].url : '',
                        content: item['content:encoded'] ? item['content:encoded'][0] : '',
                        source: item.link[0],
                        creator: item['dc:creator'] ? item['dc:creator'][0] : ''
                    });

                    await post.save();
                    console.log(`Saved post: ${post.title}`);
                }
            } catch (err) {
                console.error('Error processing item:', err);
            }
        });

        await Promise.all(promises);
        console.log('RSS feed fetched and stored successfully');
    } catch (err) {
        console.error('Error fetching RSS feed:', err);
    }
};

module.exports = fetchRSS;