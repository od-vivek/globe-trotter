import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';  // Import useNavigate for navigation
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import { useSelector} from 'react-redux';  // Import useDispatch for Redux actions
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

export default function Home() {
  SwiperCore.use([Navigation]);
  const [data, setData] = useState({});
  const [guideBlogs, setGuideBlogs] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);
  const guideId = currentUser ? currentUser._id : "";

    useEffect(() => {
        const fetchGuideUpdates = async () => {
            try {
                const response = await axios.get(`/api/admin/updates/${guideId}`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching updates:', error);
            }
        };

        fetchGuideUpdates();
    }, []);

  useEffect(() => {
    const fetchGuideBlogs = async () => {
      try {
        if (!currentUser) {
          return;
        }
        const response = await fetch('/api/blog/guideblogs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ guideName: currentUser.name }),
        });

        const data = await response.json();
        setGuideBlogs(data.blogs);
      } catch (error) {
        console.error('Error fetching guide blogs:', error);
        // Handle error, e.g., display an error message to the user
      }
    };
    fetchGuideBlogs();
  }, [currentUser]);

  return (
    <div className="container mx-auto my-8 p-8 bg-transparent rounded-md">
        <div className="flex items-center justify-between mb-4">
            {/* Welcome header with Guide photo */}
            {currentUser && (
            <div className="flex items-center">
                <img
                src={`http://localhost:5000/${currentUser?.guidePhoto}`}
                alt="Guide"
                className="rounded-full w-16 h-16 object-cover mr-4"
                />
                <div>
                <h2 className="text-3xl font-semibold">Welcome, {currentUser.name}</h2>
                </div>
            </div>
            )}
        </div>
        <div className="my-10">
            {/* Write a Blog button */}
            {currentUser && (
            <>
                <Link to="/guide/add-blog" className="bg-blue-500 text-white py-2 px-4 rounded mr-4">
                Write a Blog
                </Link>
            </>
            )}
        </div>
        {/* Revenue Chart */}
        {data.revenueChart && (
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Revenue Chart</h2>
                <Bar
                    data={data.revenueChart}
                    options={{
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Packages',
                                },
                            },
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Revenue',
                                },
                            },
                        },
                    }}
                />
            </div>
        )}
      {/* Display guide blogs */}
        {currentUser && (
            <div>
            <h4 className="text-lg font-semibold mb-2">Your Blogs:</h4>
            {guideBlogs.map((blog) => (
                <div key={blog._id} className="mb-6 p-4 border border-gray-300 rounded-md">
                <Link to={`/blog/${blog._id}`} className="text-blue-500 hover:underline">
                    <h4 className="text-xl font-semibold mb-2">{blog.title}</h4>
                </Link>
                <p className="text-gray-800">{blog.content}</p>
                </div>
            ))}
            </div>
        )}
    </div>
  );
}
