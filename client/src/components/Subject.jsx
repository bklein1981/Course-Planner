import Course from "./Course";
import Project from "./Project";

function Subject() {
  return (
    <div className="pt-4 border-2 rounded px-5 pb-5 shadow-md mb-2">
      <div className="grid grid-rows-1 pb-5 text-center text-5xl font-semibold">Professional Development</div>
      <div className="grid grid-rows-1">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-2">
          <div>
            <Course />
            <Project />
          </div>



        </div>
      </div>
    </div>
  );
}

export default Subject;
