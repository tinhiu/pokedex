/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			'raw.githubusercontent.com',
			'lastfm.freetls.fastly.net'
		],
		unoptimized: true,
	},
}

module.exports = nextConfig
