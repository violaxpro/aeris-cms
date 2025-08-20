export type PagesType = {
    id: number | string
    name: string
    body: string
    status: 'Draft' | 'Published' | 'Archived'
    metaTitle: string
    metaDescription: string
}


export const dummyPages: PagesType[] = [
    {
        id: 1,
        name: "Home",
        body: `
Artificial Intelligence (AI) is no longer just a buzzword — it’s part of our daily lives. 
From voice assistants to recommendation engines, AI is shaping decisions and making our lives easier. 
In this article, we’ll explore real-world applications of AI and what to expect in the near future.`,
        status: 'Draft',
        metaTitle: "Future of AI in Everyday Life - Insights & Trends",
        metaDescription: "Discover how AI is transforming everyday activities, from smart homes to personalized healthcare, and what the future holds."
    },
    {
        id: 2,
        name: "About Us",
        body: `
Artificial Intelligence (AI) is no longer just a buzzword — it’s part of our daily lives. 
From voice assistants to recommendation engines, AI is shaping decisions and making our lives easier. 
In this article, we’ll explore real-world applications of AI and what to expect in the near future.`,
        status: 'Published',
        metaTitle: "Future of AI in Everyday Life - Insights & Trends",
        metaDescription: "Discover how AI is transforming everyday activities, from smart homes to personalized healthcare, and what the future holds."
    },
]

