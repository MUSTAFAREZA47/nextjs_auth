export default function UserProfile({ params }: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-10">
            <div className="bg-white p-10 shadow-lg rounded-lg text-center">
                <h1 className="text-3xl font-bold text-gray-700 mb-4">
                    User Profile
                </h1>
                <hr className="my-6" />
                <p className="text-xl font-medium text-gray-600">
                    Profile Page for User ID:
                </p>
                <span className="inline-block mt-4 px-4 py-2 rounded-full bg-orange-500 text-black font-semibold">
                    {params.id}
                </span>
            </div>
        </div>
    )
}
