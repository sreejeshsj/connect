import { FaHeart, FaRegComment, FaShare } from "react-icons/fa";

function PostCard() {
  return (
    <div className='bg-white rounded-lg shadow mb-6 w-full max-w-md mx-auto'>
      <div className="flex mt-5 mb-5 ">
        <img className="w-8 h-8 rounded-full m-2" src="https://tse1.mm.bing.net/th/id/OIP.tJYl02NAHsRL3fzirIrpKwHaFe?pid=Api&P=0&h=180" alt="" />
        <p className="font-medium text-sm sm:text-base m-2">user1</p>
      </div>
      <img className='w-full' src="https://tse4.mm.bing.net/th/id/OIP.dwHPyOxaeZywNanOnoYklgHaHa?pid=Api&P=0&h=180" alt="" />
      <div className='flex gap-6 justify-start mt-4 mb-4 ml-2  '>
        <FaHeart className="hover:text-red-500 cursor-pointer "/>
        <FaRegComment className="hover:text-blue-500 cursor-pointer" />
        <FaShare/>
      </div>

    </div>
  )
}

export default PostCard
