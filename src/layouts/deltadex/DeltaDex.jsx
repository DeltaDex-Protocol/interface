
import Sidebar from "../Sidebar";

const DeltaDex = () => {
    
    return (
        <>
        <div class="relative bg-slate-300 px-2 py-3">
  <p class="text-start">DeltaDex</p>
  <div class="absolute bottom-3 right-6">
    <button class="bg-blue-200 px-3">123</button>
  </div>
</div>

<div class="relative flex">
  <Sidebar/>
  <div class="mx-auto mt-10 table max-h-4 max-w-5xl border-spacing-5 bg-slate-100 px-4 shadow-md">
    <div class="... table-header-group">
      <div class="ml-4 table-row">
        <div class="table-cell px-2 text-center">Song</div>
        <div class="... table-cell text-left">Artist</div>
        <div class="... table-cell text-left">Year</div>
      </div>
    </div>
    <div class="table-row-group">
      <div class="table-row text-center">
        <div class="... table-cell">The Sliding Mr. Bones (Next Stop, Pottersville)</div>
        <div class="... table-cell">Malcolm Lockyer</div>
        <div class="... table-cell">1961</div>
      </div>
      <div class="table-row text-center">
        <div class="... table-cell">Witchy Woman</div>
        <div class="... table-cell">The Eagles</div>
        <div class="... table-cell">1972</div>
      </div>
      <div class="table-row text-center">
        <div class="... table-cell">Shining Star</div>
        <div class="... table-cell">Earth, Wind, and Fire</div>
        <div class="... table-cell">1975</div>
      </div>
    </div>
  </div>
</div>

        </>
    )
}

export default DeltaDex;