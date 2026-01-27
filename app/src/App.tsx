import { useEffect, useRef, useState } from "react";
import "./App.css";
import CrawlHeader from "./component/header";
import Select from "./component/select";
import Image from "./component/image";
import { resource, status } from "./utils";

type ImageItem = {
    input: string;
    output: string;
    ratio: number;
    zone: string;
};

type ApiResponse = {
    data: ImageItem[];
    limit: number;
    total: number;
    totalPages: number;
    page: number;
};

function App() {
    const options = resource.map((e) => ({ label: e, value: e }));
    const statusOptions = status.map((e) => ({ label: e, value: e }));

    const [value, setValue] = useState(options[0].value);
    const [statusDetected, setStatusDetected] = useState(statusOptions[0].value);

    const [images, setImages] = useState<ImageItem[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const loaderRef = useRef<HTMLDivElement | null>(null);

    // 🔒 Refs để tránh stale state
    const loadingRef = useRef(false);
    const pageRef = useRef(1);
    const totalPagesRef = useRef(1);
    const requestIdRef = useRef(0);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const fetchData = async (
        value: string,
        statusDetected: string,
        page: number,
        signal?: AbortSignal,
    ): Promise<ApiResponse> => {
        const res = await fetch(
            `/static/resource?type=${value}&status=${statusDetected}&page=${page}`,
            { signal },
        );
        return res.json();
    };

    const toStaticPath = (input: string) => "/static/image/" + input.replace("data/", "");

    const getImageId = (input: string) => input.split("/").pop()?.split(".")[0] || "";

    // 🔁 Reset khi đổi filter
    useEffect(() => {
        requestIdRef.current += 1;

        setImages([]);
        setPage(1);
        setTotalPages(1);

        pageRef.current = 1;
        totalPagesRef.current = 1;
        loadingRef.current = false; // 🔥 thêm dòng này
    }, [value, statusDetected]);

    // 📡 Fetch data
    useEffect(() => {
        const controller = new AbortController();
        const currentRequestId = requestIdRef.current;

        const load = async () => {
            if (loadingRef.current || pageRef.current > totalPagesRef.current) return;

            loadingRef.current = true;
            setLoading(true);

            try {
                const res = await fetchData(value, statusDetected, page, controller.signal);

                if (currentRequestId !== requestIdRef.current) return;

                setImages((prev) => [...prev, ...res.data]);
                setTotalPages(res.totalPages);
                totalPagesRef.current = res.totalPages;
            } catch (err: any) {
                if (err.name !== "AbortError") console.error(err);
            } finally {
                // 🔥 LUÔN reset kể cả abort
                loadingRef.current = false;
                setLoading(false);
            }
        };

        pageRef.current = page;
        load();

        return () => {
            controller.abort();
            loadingRef.current = false; // 🔥 QUAN TRỌNG
        };
    }, [page, value, statusDetected]);

    // 👀 Observer chỉ tạo 1 lần
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    !loadingRef.current &&
                    pageRef.current < totalPagesRef.current
                ) {
                    setPage((prev) => prev + 1);
                }
            },
            { rootMargin: "200px" },
        );

        const current = loaderRef.current;
        if (current) observerRef.current.observe(current);

        return () => observerRef.current?.disconnect();
    }, []);

    return (
        <>
            <CrawlHeader
                title="Crawl Background"
                subtitle="Background animation with Tailwind CSS"
            />

            <div className="min-h-screen bg-gray-50 p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                        id="resource"
                        label="Keyword"
                        list={options}
                        value={value}
                        setValue={setValue}
                    />
                    <Select
                        id="status"
                        label="Trạng thái detect"
                        list={statusOptions}
                        value={statusDetected}
                        setValue={setStatusDetected}
                    />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {images.map((item, index) => (
                        <Image
                            key={index}
                            src={toStaticPath(item.input)}
                            alt="img"
                            ratio={item.ratio}
                            title={getImageId(item.input)}
                            lazy
                        />
                    ))}
                </div>

                <div ref={loaderRef} className="h-16 flex justify-center items-center">
                    {loading && <span className="text-gray-500">Loading...</span>}
                    {!loading && pageRef.current >= totalPagesRef.current && (
                        <span className="text-gray-400 text-sm">Hết ảnh</span>
                    )}
                </div>
            </div>
        </>
    );
}

export default App;
