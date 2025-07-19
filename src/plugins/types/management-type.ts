import { boolean } from "zod"

export type ImageSlideType = {
    general: {
        caption_one: string
        caption_two: string
        direction: string
        call_text: string
        call_url: string
        open_in_new_tab: boolean
    }
    option: {
        caption: string
        delay: string
        effected: string
    }

}

export type SliderType = {
    id?: number | string | undefined
    name: string
    speed: string
    fade: boolean
    autoplay_spped: string
    dots?: boolean
    arrows?: number
    image_slide?: ImageSlideType[];
};

//Storefont
// general Setting Type
export type GeneralType = {
    welcome_text: string
    middle_top_text: string
    theme_color: string
    mail_theme_color: string
    slider: string
    term_condition: string
    address: string
}

export type Logo = {
    favicon: string
    header_logo: string
    mail_logo: string
}

export type Menus = {
    navbar_menu: string
    primary_menu: string
    primary_category_menu: string
    popular_categories: string
    category_menu: string
    footer_menu_one_title: string
    footer_menu_one: string
    footer_menu_two_title: string
    footer_menu_two: string
}
export type Footer = {
    footer_tags: string
    footer_copyright_text: string
    accepted_payment_methods_image: string
}
export type Newsletter = {
    background_image: string
}
export type Features = {
    section_status: boolean
    feature: [
        {
            title: string
            subtitle: string
            icon: string
        }
    ]
}
export type ProductPage = {
    product_page_banner: [
        {
            call_to_action_url: string
            open_in_new_windows: boolean
            product_page_banner_image: string
        }
    ]
}
export type SocialLinks = {
    facebook: string
    twitter: string
    instagram: string
    youtube: string
}

export type SliderBanners = {
    banner1: {
        call_to_action_url: string
        open_in_new_windows: boolean
        slider_banner_1: string
    },
    banner2: {
        call_to_action_url: string
        open_in_new_windows: boolean
        slider_banner_2: string
    }
}

export type BannerColumn = {
    call_to_action_url: string
    open_in_new_windows: boolean
    image: string
}
export type ThreeColumnBanner = {
    section_status: boolean
    section_title: string
    background_image: string
    banner1: BannerColumn,
    banner2: BannerColumn
    banner3: BannerColumn
}

export type CategoryFeatureCategories = {
    category: string
    type: string
}
export type FeatureCategories = {
    section_status: boolean
    section_title: string
    section_subtitle: string
    category1: CategoryFeatureCategories
    category2: CategoryFeatureCategories
    category3: CategoryFeatureCategories
    category4: CategoryFeatureCategories
    category5: CategoryFeatureCategories
    category6: CategoryFeatureCategories
}

export type TabsVerticalProduct = {
    title: string
    type: string
    product: string
}
export type TabsProductGrid = {
    title: string
    type: string
    category: string
}
export type ProductTabsOne = {
    section_status: boolean
    section_title: string
    tab1: TabsVerticalProduct
    tab2: TabsVerticalProduct
    tab3: TabsVerticalProduct
    tab4: TabsVerticalProduct
}

export type TopBrandsType = {
    section_status: boolean
    top_brand: string[]
}
export type FlashSalesVerticalProductType = {
    section_status: boolean
    section_title: string
    flash_sale: {
        title: string
        active_campaign: string
    }
    vertical_product1: TabsVerticalProduct
    vertical_product2: TabsVerticalProduct
    vertical_product3: TabsVerticalProduct
}

export type TwoColumnBanners = {
    section_status: boolean
    banner1: BannerColumn,
    banner2: BannerColumn
}

export type ProductGridType = {
    section_status: boolean
    section_title: string
    tab1: TabsVerticalProduct
    tab2: TabsProductGrid
    tab3: TabsProductGrid
    tab4: TabsProductGrid
    tab5: TabsProductGrid
    tab6: TabsVerticalProduct
    tab7: TabsProductGrid
    tab8: TabsProductGrid
}

export type ContactBanner = {
    section_status: boolean
    banner1: BannerColumn
    banner2: BannerColumn
    banner3: BannerColumn
}

export type ProductsTabsTwo = {
    section_status: boolean
    section_title: string
    title: string
    tab1: TabsProductGrid
    tab2: TabsProductGrid
    tab3: TabsProductGrid
    tab4: TabsProductGrid
}

export type OneColumnBanner = {
    section_status: boolean
    banner: BannerColumn
}

export type StoreFontType = {
    id?: number | string | undefined
    general_setting: {
        general: GeneralType
        logo: Logo
        menus: Menus
        footer: Footer
        newsletter: Newsletter
        features: Features
        product_page: ProductPage
        social_links: SocialLinks
    },
    homepage_settings: {
        slider_banners: SliderBanners
        three_column_full_width_banner: ThreeColumnBanner
        featured_categories: FeatureCategories
        products_tab_one: ProductTabsOne
        top_brands: TopBrandsType
        flash_sale_vertical_products: FlashSalesVerticalProductType
        two_column_banners: TwoColumnBanners
        product_grid: ProductGridType
        three_column_banner: ThreeColumnBanner
        contact_banners: ContactBanner
        products_tab_two: ProductsTabsTwo
        one_column_banner: OneColumnBanner
    }
};




