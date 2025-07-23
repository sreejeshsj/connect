import { FaHeart, FaRegComment, FaShare } from "react-icons/fa";

function PostCard(props) {
  return (
    <div className='bg-white rounded-lg shadow mb-6 w-full max-w-md mx-auto'>
      <div className="flex mt-5 mb-5 ">
        <img className="w-8 h-8 rounded-full m-2" src={props.dp} alt="" />
        <p className="font-medium text-sm sm:text-base m-2">{props.name}</p>
      </div>
      <img className='w-full' src={props.image} alt="" />
      <div className='flex gap-6 justify-start mt-4 mb-3 ml-2  '>
        <FaHeart className="hover:text-red-500 cursor-pointer "/>
        <FaRegComment className="hover:text-blue-500 cursor-pointer" />
        <FaShare/>
      </div>

      <p>{props.caption}</p>

    </div>
  )
}

export default PostCard
