export default function LoginPage() {
  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold">Register</h2>
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
            />
          </div>
          <div>
            <label htmlFor="password-confirm" className="font-bold">
              Confirm Password
            </label>
            <input
              type="password"
              id="password-confirm"
              className="w-full h-10 p-2 rounded-md border-emerald-800 border-2"
              placeholder="Password"
            />
          </div>
          <button className="w-full h-10 bg-emerald-800 text-white rounded-md mt-2">
            Register
          </button>
        </div>
        <div className="mt-2">
          Have an account?{" "}
          <a href="/login" className="text-emerald-800">
            Log in
          </a>
        </div>
      </form>
    </div>
  );
}
