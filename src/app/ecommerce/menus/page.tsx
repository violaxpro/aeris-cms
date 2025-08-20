import React from 'react'
import MenuList from '@/features/pages/management/menus'

export default async function MenuPage() {
    let datas: any = [];
    //   try {

    //   } catch (error) {
    //     console.error('Fetch error:', error);
    //   }


    return (
        <div>
            <MenuList menuDatas={datas} />
        </div>
    )

}


