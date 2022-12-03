/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchArtist, artistSelector, Tracklist } from "../../features/artists";
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid'
import { Artist } from '../../features/tracks/reducer';
import Loader from './Loader';

interface Props {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    artistObject: Artist | null
}

export default function ArtistModal({ open, setOpen, artistObject }: Props) {
  const cancelButtonRef = useRef(null);
  const dispatch = useAppDispatch();

  const {pending, artist} = useAppSelector(artistSelector);

  useEffect(() => {
      dispatch(fetchArtist({id: artistObject?.id || ''}))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artistObject?.id]);

  function convertSeconds(seconds: number) {
    const convert = function (x: number) {
      return x < 10 ? '0' + x : x;
    };
    const d = (seconds / 60) % 60;
    const intD = parseInt(d.toString());

    return convert(intD) + ':' + convert(seconds % 60);
  }

  const getTopTracklist = (list: Tracklist[]) => {
      const topList = [...list].splice(0, 5);
      return topList;
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-20 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-1 pb-4 sm:pt-3 sm:pb-">
                <div className='flex justify-end mb-2'> 
                  <button className='w-6 h-6' onClick={() => setOpen(false)}>
                    <XMarkIcon />
                  </button>
                </div>
                <div className="">
                    <div className="flex">
                        <div className="w-1/2 p-2 bg-gray-600 hover:bg-gray-800 drop-shadow-2xl rounded-md border-solid border-2 mr-5 transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300">
                            <img src={artistObject?.picture_xl} alt="Artist cover" className="w-full" />
                        </div>
                        <div className="w-1/2 flex flex-col justify-end">
                            <div className="text-2xl text-teal-600 font-bold">{artistObject?.name}</div>
                            <div className="text-lg font-ligth"><span className="font-semibold underline">{artist?.nb_fan}</span> fans</div>
                        </div>
                    </div>

                    <div className="w-full border-b-2 border-gray-200 mt-4 mb-2"></div>
                    <div className="flex-1 h-full p-0 md:p-5 mt-2 md:mt-0">
                        <div className="text-2xl font-bold">Top Tracks</div>
                        <div className="pt-1">
                            {artist && getTopTracklist(artist?.tracklist).map((item: Tracklist, index) => (
                            <div className="flex py-1 font-ligth border-b-gray-200 border-b-2" key={item.id}>
                                <div className="flex-1 text-sm">
                                    <span className="font-bold">{index + 1}.</span> {item.title}
                                </div>
                                <div className="px-2">{convertSeconds(item.duration)}</div>
                            </div>))}
                            {(pending && !artist) && <Loader />}
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
