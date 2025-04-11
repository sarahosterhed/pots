export type IndexedItem = {
    displayLink: string;
    formattedUrl: string;
    htmlFormattedUrl: string;
    htmlSnippet: string;
    htmlTitle: string;
    kind: string;
    link: string;
    snippet: string,
    pagemap: {
        cse_image?: IndexedItemThumbnail[]
    };
    title: string;
}

export type IndexedItemThumbnail = {
    height: string,
    src: string,
    width: string,
}
