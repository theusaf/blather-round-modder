export default function LoginPage() {
  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold">Log In</h2>
      <form>
        <div className="flex flex-col gap-2">
          <div>
            <label htmlFor="username" className="font-bold">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full h-10 p-2 rounded-md border-emerald-800 border-2"
              placeholder="Username"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full h-10 p-2 rounded-md border-emerald-800 border-2"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full h-10 bg-emerald-800 text-white rounded-md mt-2"
          >
            Log In
          </button>
        </div>
        <div className="mt-2">
          New user?{" "}
          <a href="/register" className="text-emerald-800">
            Register now!
          </a>
        </div>
      </form>
    </div>
  );
}
