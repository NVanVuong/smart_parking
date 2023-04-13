function Loading() {
    return (
        <div
            className="m-auto h-10 w-10 animate-spin rounded-full border-4 border-current border-t-transparent text-blue-main"
            role="status"
            aria-label="loading"
        >
            <span className="sr-only">Loading...</span>
        </div>
    );
}

export default Loading;
