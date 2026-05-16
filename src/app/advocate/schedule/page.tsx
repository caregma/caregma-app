"use client";

import { useState } from "react";
import { AdvocateLayout } from "@/components/advocate-layout";
import { PageHeader } from "@/components/page-header";
import { Panel } from "@/components/panel";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";

interface DayBlock {
  start: string;
  end: string;
}

const INITIAL_SCHEDULE: Record<string, DayBlock[]> = {
  Monday: [{ start: "9:00am", end: "12:00pm" }, { start: "2:00pm", end: "5:00pm" }],
  Tuesday: [{ start: "9:00am", end: "5:00pm" }],
  Wednesday: [{ start: "1:00pm", end: "6:00pm" }],
  Thursday: [{ start: "9:00am", end: "5:00pm" }],
  Friday: [{ start: "10:00am", end: "2:00pm" }],
  Saturday: [],
  Sunday: [],
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface TimeOff {
  id: number;
  range: string;
  label: string;
  meta: string;
}

const INITIAL_TIME_OFF: TimeOff[] = [
  { id: 1, range: "June 12–18", label: "Family vacation", meta: "7 days · No bookings will be accepted" },
];

export default function AdvocateSchedulePage() {
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [timeOff, setTimeOff] = useState(INITIAL_TIME_OFF);
  const [editDayOpen, setEditDayOpen] = useState<string | null>(null);
  const [timeOffOpen, setTimeOffOpen] = useState<number | "new" | null>(null);

  return (
    <AdvocateLayout>
      <PageHeader
        title="Your availability."
        subtitle="Set when families can book you. We never offer hours that conflict with your connected calendar."
      />

      {/* Calendar connection */}
      {!calendarConnected ? (
        <Panel>
          <div className="flex items-center gap-5 px-7 py-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-bg-alt">
              <GoogleCalIcon />
            </div>
            <div className="flex-1">
              <div className="mb-0.5 text-[15px] font-medium">Connect your calendar</div>
              <div className="text-[13px] text-ink-soft">
                When you connect Google or Microsoft, Caregma reads your busy times
                and never offers conflicting hours to families. Sessions you accept
                go on your calendar automatically.
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setCalendarConnected(true)}
            >
              <GoogleLogo /> Google
            </Button>
            <Button variant="secondary" size="sm">
              Microsoft
            </Button>
            <Button variant="secondary" size="sm">
              iCal feed
            </Button>
          </div>
        </Panel>
      ) : (
        <>
          <Panel className="border-teal">
            <div className="flex items-center gap-4 px-7 py-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-soft text-lg text-teal">
                ✓
              </div>
              <div className="flex-1">
                <div className="mb-0.5 text-sm font-medium">
                  Google Calendar connected ·{" "}
                  <span className="font-normal text-ink-soft">sarah.reyes@gmail.com</span>
                </div>
                <div className="text-xs text-ink-soft">
                  Last synced 2 minutes ago · 3 conflicts blocked this week
                </div>
              </div>
              <Button variant="ghost" size="sm">Sync now</Button>
              <Button variant="ghost" size="sm" onClick={() => setCalendarConnected(false)}>
                Disconnect
              </Button>
            </div>
          </Panel>
        </>
      )}

      {/* Weekly hours */}
      <Panel
        title="Weekly hours"
        actions={
          <Button variant="secondary" size="sm" onClick={() => setEditDayOpen("__new__")}>
            + Add time block
          </Button>
        }
      >
        <div className="px-7 py-6">
          {DAYS.map((day, i) => {
            const blocks = schedule[day];
            const empty = blocks.length === 0;
            return (
              <div
                key={day}
                className={`grid grid-cols-[120px_1fr_auto] items-center gap-5 py-3.5 ${
                  i < DAYS.length - 1 ? "border-b border-line-soft" : ""
                }`}
              >
                <div className={`font-medium ${empty ? "text-ink-faint" : ""}`}>
                  {day}
                </div>
                <div className={empty ? "text-ink-faint" : "text-ink-soft"}>
                  {empty
                    ? "Not available"
                    : blocks.map((b) => `${b.start} – ${b.end}`).join(", ")}
                </div>
                <Button variant="ghost" size="sm" onClick={() => setEditDayOpen(day)}>
                  {empty ? "Add hours" : "Edit"}
                </Button>
              </div>
            );
          })}
        </div>
      </Panel>

      {/* Time off */}
      <Panel
        title="Time off"
        actions={
          <Button variant="secondary" size="sm" onClick={() => setTimeOffOpen("new")}>
            + Add time off
          </Button>
        }
      >
        {timeOff.length === 0 ? (
          <div className="px-7 py-7 text-center text-sm text-ink-faint">
            No upcoming time off. Click "+ Add time off" to block a date range.
          </div>
        ) : (
          timeOff.map((t, i) => (
            <div
              key={t.id}
              className={`grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-5 px-7 py-5 ${
                i < timeOff.length - 1 ? "border-b border-line-soft" : ""
              }`}
            >
              <div className="font-mono text-xs text-ink-faint">{t.range}</div>
              <div>
                <div className="text-[15px] font-medium">{t.label}</div>
                <div className="text-[13px] text-ink-soft">{t.meta}</div>
              </div>
              <div />
              <div />
              <Button variant="ghost" size="sm" onClick={() => setTimeOffOpen(t.id)}>
                Edit
              </Button>
            </div>
          ))
        )}
      </Panel>

      {/* Conflicts (only if connected) */}
      {calendarConnected && (
        <Panel
          title="Blocked by your calendar this week"
          meta="Auto-detected, no action needed"
        >
          {[
            { id: "TUE", title: '"Onc team meeting"', meta: "Tue May 16 · 10:00am – 11:00am · From Google Calendar" },
            { id: "WED", title: '"Pediatrician — Lily"', meta: "Wed May 17 · 3:00pm – 4:00pm · From Google Calendar" },
            { id: "FRI", title: '"Dentist"', meta: "Fri May 19 · 11:00am – 12:30pm · From Google Calendar" },
          ].map((c, i, arr) => (
            <div
              key={c.id}
              className={`grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-5 px-7 py-5 ${
                i < arr.length - 1 ? "border-b border-line-soft" : ""
              }`}
            >
              <div className="font-mono text-xs text-ink-faint">{c.id}</div>
              <div>
                <div className="text-[15px] font-medium">{c.title}</div>
                <div className="text-[13px] text-ink-soft">{c.meta}</div>
              </div>
              <div />
              <StatusBadge status="note-due">Blocked</StatusBadge>
              <div />
            </div>
          ))}
        </Panel>
      )}

      {/* Edit day modal */}
      {editDayOpen && (
        <Modal onClose={() => setEditDayOpen(null)}>
          <h3 className="font-serif text-2xl font-medium">
            {editDayOpen === "__new__" ? "Add a time block" : `Edit ${editDayOpen}`}
          </h3>
          <p className="mb-4 mt-2 text-sm text-ink-soft">
            Pick a start and end time, then save.
          </p>
          {editDayOpen === "__new__" && (
            <>
              <label className="field-label mt-2">Day of the week</label>
              <select>
                {DAYS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </>
          )}
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <label className="field-label">Start time</label>
              <select defaultValue="9:00am">
                {["7:00am", "8:00am", "9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label">End time</label>
              <select defaultValue="5:00pm">
                {["10:00am", "11:00am", "12:00pm", "1:00pm", "2:00pm", "3:00pm", "4:00pm", "5:00pm", "6:00pm"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          {calendarConnected && (
            <div className="mt-4 rounded-lg bg-warn-soft p-3 px-3.5 text-[13px] text-warn">
              ⚠ Heads up — you have 2 events on your Google Calendar during this block. We'll automatically hide those times from families.
            </div>
          )}
          <div className="mt-6 flex justify-end gap-2.5">
            <Button variant="ghost" onClick={() => setEditDayOpen(null)}>Cancel</Button>
            <Button variant="teal" onClick={() => setEditDayOpen(null)}>Save block →</Button>
          </div>
        </Modal>
      )}

      {/* Time off modal */}
      {timeOffOpen !== null && (
        <Modal onClose={() => setTimeOffOpen(null)}>
          <h3 className="font-serif text-2xl font-medium">
            {timeOffOpen === "new" ? "Add time off" : "Edit time off"}
          </h3>
          <p className="mb-4 mt-2 text-sm text-ink-soft">
            Block a date range when you're not available. Existing bookings during this range will stay.
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <div>
              <label className="field-label">From</label>
              <input type="date" />
            </div>
            <div>
              <label className="field-label">Through</label>
              <input type="date" />
            </div>
          </div>
          <label className="field-label mt-3">Reason (for your reference only)</label>
          <input placeholder="e.g. Family vacation, conference, sick leave" />
          <label className="mt-4 flex items-center gap-2.5 text-[13px] text-ink-soft">
            <input type="checkbox" defaultChecked className="w-auto" />
            Also block these dates on my Google Calendar
          </label>
          <div className="mt-6 flex justify-end gap-2.5">
            <Button variant="ghost" onClick={() => setTimeOffOpen(null)}>Cancel</Button>
            {timeOffOpen !== "new" && (
              <Button
                variant="ghost"
                onClick={() => {
                  setTimeOff(timeOff.filter((t) => t.id !== timeOffOpen));
                  setTimeOffOpen(null);
                }}
                className="border-coral text-coral hover:bg-coral hover:text-white"
              >
                Delete
              </Button>
            )}
            <Button variant="teal" onClick={() => setTimeOffOpen(null)}>Save →</Button>
          </div>
        </Modal>
      )}
    </AdvocateLayout>
  );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-5 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[520px] rounded-3xl bg-bg p-9 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function GoogleCalIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 48 48">
      <rect width="48" height="48" rx="6" fill="#fff" />
      <path d="M14 20h20v18a2 2 0 0 1-2 2H16a2 2 0 0 1-2-2V20z" fill="#4285F4" />
      <rect x="14" y="14" width="20" height="8" rx="2" fill="#1A73E8" />
      <text x="24" y="35" textAnchor="middle" fill="white" fontSize="11" fontWeight="700">
        15
      </text>
    </svg>
  );
}

function GoogleLogo() {
  return (
    <svg width="14" height="14" viewBox="0 0 18 18">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  );
}
