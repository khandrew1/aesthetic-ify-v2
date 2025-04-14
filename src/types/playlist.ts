export type SpotifyPlaylistType = {
	collaborative: boolean;
	description: string;
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: [image: { height?: number; url: string; width?: number }];
	name: string;
	owner: {
		display_name: string;
		external_urls: {
			spotify: string;
		};
		href: string;
		id: string;
		type: string;
		url: string;
	};
	primary_color?: string;
	public: boolean;
	snapshot_id: string;
	tracks: {
		href: string;
		total: number;
	};
	type: string;
	uri: string;
};

export type PlaylistItemType = {
	description: string;
	href: string;
	id: string;
	image: string;
	name: string;
	tracks: {
		href: string;
		total: number;
	};
};

export type SpotifyAPIResponse = {
	href: string;
	limit: number;
	offset: number;
	total: number;
	next?: number;
	previous?: number;
	items: PlaylistItemType[];
};

export type PlaylistAPIResponse = {
	next: number;
	res: SpotifyAPIResponse;
};
