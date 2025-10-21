import React from "react";

export default function Placeholder({ qNumber }) {
  return (
    <div className="mt-6 p-6 rounded-2xl bg-white/3 border border-white/8 text-gray-100">
      <h4 className="text-lg font-semibold mb-2">Component for Question {qNumber}</h4>
      <p className="text-sm">
        This component is not implemented yet. You can create a component file under{" "}
        <code className="bg-white/6 px-1 py-0.5 rounded">src/components/Q{qNumber}.jsx</code> and
        then import & add it to <code className="bg-white/6 px-1 py-0.5 rounded">componentMap</code>{" "}
        in <code className="bg-white/6 px-1 py-0.5 rounded">App.jsx</code>.
      </p>
      <p className="mt-3 text-xs text-gray-200">Tip: follow the existing pattern used for Q1.</p>
    </div>
  );
}
