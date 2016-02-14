const DN_API_ENDPOINT = 'https://www.designernews.co/api/v2/';

exports.DN_TOP = DN_API_ENDPOINT + 'stories/';
exports.DN_RECENT = DN_API_ENDPOINT + 'stories?sort=-created_at';

exports.DN_USERS = DN_API_ENDPOINT + 'users/';
