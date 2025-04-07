"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProjectCardProps {
  project: {
    title: string
    description: string
    image: string
    tags: string[]
    links: {
      platform: string
      url: string
    }[]
  }
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Card className="overflow-hidden group bg-background/50 backdrop-blur-sm border-white/10 hover:border-purple-500/50 transition-colors h-full flex flex-col">
        <div className="relative overflow-hidden aspect-video">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={500}
            height={300}
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/80 to-cyan-500/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-3">
              {project.links.map((link, i) => (
                <Button
                  key={i}
                  variant="secondary"
                  className="shadow-lg"
                  onClick={() => window.open(link.url, "_blank")}
                >
                  {link.platform}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
        </div>
        <CardContent className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-cyan-500 transition-all duration-300">
            {project.title}
          </h3>
          <p className="text-gray-300 mb-4 flex-grow">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag, i) => (
              <Badge
                key={i}
                className={
                  i % 2 === 0
                    ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                    : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20"
                }
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

