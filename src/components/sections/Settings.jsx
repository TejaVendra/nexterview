
import React, { useState } from "react";

function Settings() {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Account Settings
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account and other settings.
        </p>
      </div>

      {/* Delete Account Card */}
      <div className="rounded-2xl border border-red-200 bg-white shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="border-b border-red-100 bg-red-50 px-6 py-5">
          <h3 className="text-lg font-semibold text-red-700">
            Delete Account
          </h3>

          <p className="mt-1 text-sm text-red-600">
            This action is permanent and cannot be undone.
          </p>
        </div>

        <div className="p-6">
          {/* Rules */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <h4 className="font-semibold text-gray-900">
              Before you delete your account
            </h4>

            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li className="flex gap-3">
                <span className="text-red-500">•</span>
                <span>
                  Your profile and personal information will be permanently
                  removed.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="text-red-500">•</span>
                <span>
                  Your interview history and related data may be permanently
                  deleted.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="text-red-500">•</span>
                <span>
                  You will be signed out of your account immediately.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="text-red-500">•</span>
                <span>
                  This action cannot be reversed once the deletion is
                  completed.
                </span>
              </li>
            </ul>
          </div>

          {/* Confirmation */}
          <label className="mt-6 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1 h-4 w-4 cursor-pointer rounded border-gray-300 text-red-600 focus:ring-red-500"
            />

            <span className="text-sm text-gray-700">
              I understand that deleting my account is permanent and that my
              account data may not be recoverable.
            </span>
          </label>

          {/* Delete Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              disabled={!accepted}
              className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
