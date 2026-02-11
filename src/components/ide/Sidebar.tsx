import { FileCode, Folder, Plus, Box } from "lucide-react";
import { useState } from "react";

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  language?: 'c' | 'cpp' | 'h' | 'json';
  content?: string;
  children?: FileNode[];
  isOpen?: boolean; 
}

interface SidebarProps {
  files: FileNode[];
  activeFileId: string | null;
  onSelectFile: (id: string) => void;
  onNewFile: () => void; // Placeholder
}

const FileItem = ({ node, depth = 0, activeFileId, onSelectFile }: { node: FileNode, depth?: number, activeFileId: string | null, onSelectFile: (id: string) => void }) => {
    const isActive = activeFileId === node.id;
    const [isOpen, setIsOpen] = useState(true);

    const toggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (node.type === 'folder') setIsOpen(!isOpen);
        else onSelectFile(node.id);
    };

    return (
        <div>
            <div 
                className={`
                    flex items-center gap-2 px-3 py-1.5 cursor-pointer select-none text-xs transition-colors
                    ${isActive ? 'bg-white/5 text-cyber-cyan border-l-2 border-cyber-cyan' : 'text-gray-500 hover:text-white border-l-2 border-transparent hover:bg-white/[0.02]'}
                `}
                style={{ paddingLeft: `${depth * 12 + 12}px` }}
                onClick={toggle}
            >
                {node.type === 'folder' ? (
                    <Folder size={14} className={isActive ? "text-cyber-cyan" : "text-gray-600"} />
                ) : (
                    <FileCode size={14} className={isActive ? "text-cyber-cyan" : "text-gray-600"} />
                )}
                <span>{node.name}</span>
            </div>
            {node.type === 'folder' && isOpen && node.children && (
                <div>
                    {node.children.map(child => (
                        <FileItem key={child.id} node={child} depth={depth + 1} activeFileId={activeFileId} onSelectFile={onSelectFile} />
                    ))}
                </div>
            )}
        </div>
    );
};


export default function Sidebar({ files, activeFileId, onSelectFile }: SidebarProps) {
  return (
    <div className="h-full bg-black/40 border-r border-white/5 flex flex-col w-64 shrink-0">
        <div className="h-10 border-b border-white/5 flex items-center justify-between px-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
                <Box size={14} /> Workspace
            </span>
            <div className="flex gap-2">
                <Plus size={14} className="text-gray-600 hover:text-white cursor-pointer transition-colors" />
            </div>
        </div>
        
        <div className="flex-1 overflow-auto py-2">
            {files.map(file => (
                <FileItem key={file.id} node={file} activeFileId={activeFileId} onSelectFile={onSelectFile} />
            ))}
        </div>

        <div className="p-4 border-t border-white/5 bg-black/20">
            <div className="text-[9px] text-gray-600 font-tech uppercase tracking-widest mb-2">Build Environment</div>
            <div className="flex items-center justify-between text-xs text-gray-400 bg-white/5 p-2 rounded border border-white/5">
                <span>Target: WASM32</span>
                <span className="text-cyber-cyan">Clang 16</span>
            </div>
        </div>
    </div>
  );
}
