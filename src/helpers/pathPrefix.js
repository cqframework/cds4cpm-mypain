let pathPrefix = '';
if (process.env.REACT_APP_PUBLIC_URL) {
    const publicUrl = new URL(process.env.REACT_APP_PUBLIC_URL);
    pathPrefix = publicUrl.pathname;
}

export default pathPrefix