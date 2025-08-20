export type BlogType = {
    id: number | string
    title: string
    shortDescription: string
    body: string
    status: 'Draft' | 'Published' | 'Archived'
    category: string
    image: string
    metaTitle: string
    metaDescription: string
}

export type BlogCategoriesType = {
    id: number | string
    title: string
    metaTitle: string
    metaDescription: string
}

export const dummyBlog: BlogType[] = [
    {
        id: 1,
        title: "The Future of AI in Everyday Life",
        shortDescription: "Exploring how artificial intelligence is changing the way we live, work, and interact with technology.",
        body: `
Artificial Intelligence (AI) is no longer just a buzzword — it’s part of our daily lives. 
From voice assistants to recommendation engines, AI is shaping decisions and making our lives easier. 
In this article, we’ll explore real-world applications of AI and what to expect in the near future.`,
        status: "Draft",
        category: "Technology",
        image: "/apple-icon.png", // contoh dummy image
        metaTitle: "Future of AI in Everyday Life - Insights & Trends",
        metaDescription: "Discover how AI is transforming everyday activities, from smart homes to personalized healthcare, and what the future holds."
    }
]

export const dummyBlogCategories: BlogCategoriesType[] = [
    {
        id: 1,
        title: "The Future of AI in Everyday Life",
        metaTitle: "Future of AI in Everyday Life - Insights & Trends",
        metaDescription: "Discover how AI is transforming everyday activities, from smart homes to personalized healthcare, and what the future holds."
    }
]

