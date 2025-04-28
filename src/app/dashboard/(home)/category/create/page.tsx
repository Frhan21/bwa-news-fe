import React from 'react'
import FormCategory from '../components/form-category'

const Page = () => {
  return (
    <div className=''>
        <div className='flex flex-row items-center justify-between'>
            <div className='my-5 text-2xl font-bold'>
                Tambah Kategori
            </div>
        </div>
        <FormCategory type='ADD'/> 
    </div>
  )
}

export default Page 