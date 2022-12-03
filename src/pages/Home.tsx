import { useState, useEffect, useCallback, ChangeEvent } from "react";
import { debounce } from "lodash"
import Layout from "../components/layouts/Layout";
import {Option} from "../components/molecules/Select";
import { MagnifyingGlassIcon, PlayIcon } from '@heroicons/react/20/solid'
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchTracks, trackSelector } from "../features/tracks";
import Loader from "../components/atoms/Loader";
import { MusicalNoteIcon } from "@heroicons/react/20/solid";

const Home = () => {
    const dispatch = useAppDispatch();

    const options: Option[] = [
        {title: 'All', name: 'q'}, 
        {title: 'Artist', name: 'artist'}, 
        {title: 'Label', name: 'label'}, 
        {title: 'Album', name: 'album'}
    ];
    const [search, setSearch] = useState<string>('');
    const [type, setType] = useState<string>('q');

    const {pending, tracks} = useAppSelector(trackSelector);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const name = e.target.value;
        setType(name);
    }

    // delay dispatch for 500 miliseconds to avoid multiple request to API
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedDispatch = useCallback(
        debounce((type_, search_) => {
            dispatch(fetchTracks({params: `${type_}=${search_}`}))
        }, 500)
      , []);

    useEffect(() => {
        debouncedDispatch(type, search)
    }, [debouncedDispatch, type, search])

    return (
        <Layout>
            <div className="grid grid-cols-6 gap-10 px-10 py-5">
                <div className="md:col-start-2 col-span-6 md:col-span-4 p-5 flex shadow-sm bg-gray-100">
                    <div className=" bg-gray-300 inset-y-0 flex items-center border-1 border-slate-600">
                        <select
                            id="type"
                            name="type"
                            className="h-full bg-gray-100 rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-teal-500 focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
                            onChange={handleSelect}
                            value={type}
                        >
                            {options.map(item =>(<option key={item.name} value={item.name}>{item.title}</option>))}
                        </select>
                    </div>
                    <input
                        type="text"
                        name="serach"
                        id="search"
                        value={search}
                        className="block w-3/4 h-10 pl-1 bg-gray-100 border-2 border-gray-200 border-r-0 focus:outline-none sm:text-sm"
                        placeholder="Eminem"
                        onChange={onChange}
                    />
                    <div className="bg-gray-100 border-2 border-gray-200 border-l-0 rounded-r-sm inset-y-0 flex items-center px-2">
                    <MagnifyingGlassIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                    </div>
                </div>

                <div className="grid grid-cols-6 md:col-start-2 col-span-6 md:col-span-4 gap-5">
                    {tracks && tracks.map((track, index) => (
                        <div className="col-span-6 md:col-span-2 bg-gray-900 hover:bg-slate-700 rounded-lg p-4 mb-5 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 cs-parent" key={track.id}>
                            
                            <div className="w-full h-auto bg-gray-900 relative">
                                <div className="flex items-center justify-center absolute top-1 left-1 w-5 h-5 rounded-full bg-gray-900 text-green-500">
                                  <MusicalNoteIcon className="h-4 w-4"  />
                                </div>
                                <button className="flex items-center justify-center absolute bottom-8 right-8 z-20 w-12 lg:w-16 h-12 lg:h-16 rounded-full bg-teal-500 hover:bg-teal-600 text-gray-800 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">
                                  <PlayIcon className="h-7 w-7"  />
                                </button>
                                <img src={track.artist.picture_xl} alt="Song cover" className="w-full rounded-md" />
                            </div>
                            <div className="p-5">
                                <div className="text-teal-600 font-bold text-xl">{track.title}</div>
                                <div className="text-white text-xs font-light"><span className="text-xs font-semibold">Duration:</span> {track.duration}s</div>
                                <div className="text-white text-sm font-thin">By <Link to={`/artist/${track.artist.id}`} className="text-md font-bold underline">{track.artist.name}</Link></div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* <div className="flex flex-col w-full px-10 py-5">
                    {(!pending && tracks.length === 0) && (
                        <div className="text-3xl font-bold text-teal-400 text-center w-full">
                            No Tracks found. Update search values 
                        </div>
                    ) }
                    {pending && (<Loader />)}
                </div> */}
            </div>
        </Layout>
    )
}

export default Home;